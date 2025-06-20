//controller
import Product from "../models/product.model.js";
import cloudinary from "../lib/cloudinary.js";
import { redis } from "../lib/redis.js";



export const getAllProducts = async (req,res)=>{

    try {
        const products = await Product.find({});
        res.status(201).json({Success:true,products})
    } catch (error) {
        console.log("Error in getAllProducts controller",error.message)
        res.status(500).json({Success:false,message:"Server error",error:error.message})
    }
}

export const createProducts = async (req,res)=>{
    try {
        const {name,price,images,description,category,specialFeatures,fabricType,color} = req.body;

        const cloudinaryUrls = [];

        if(images && images.length>0){
            for (const image of images){
                const cloudinaryResponse = await cloudinary.uploader.upload(image,{
                    folder:"products"
                });
                cloudinaryUrls.push(cloudinaryResponse.secure_url)
            }
        }

        const product = await Product.create({
            name,
            description,
            price,
            images:cloudinaryUrls,
            category,
            fabricType,
            color,
        });

        res.status(201).json(product)
    } catch (error) {
        console.log("Error in createProduct controller",error.message)
        res.status(500).json({Success:false,message:"server error",error:error.message})
    }
}

export const getProductsByCategory = async (req,res) =>{
    const {category} = req.params;
    try {
        const products = await Product.find({category});
        res.status(201).json({Success:true,products});
    } catch (error) {
        console.log("Error in getProductsByCategory controller",error.message)
        res.status(500).json({Success:false,message:"Server Error",error:error.message})
    }
}

export const toggleFeaturedProduct = async (req,res) =>{
    const ID = req.params.id;
    try {
        const product = await Product.findById(ID);
        if(product){
            product.isFeatured = !product.isFeatured;
            const updateProduct = await product.save();
            await updateFeaturedProductCache();
            res.status(201).json({Success:true,updateProduct});
        }
    } catch (error) {
        console("Error in toggleFeaturedProduct controller",error.message);
        res.status(500).json({Success:false,message:"Server error",error:error.message})
    }
}

export const getFeaturedProducts =async(req,res)=>{
    try {
        let featuredProducts = await redis.get("featured_products");
        if (featuredProducts){
            return res.json(JSON.parse(featuredProducts));
        }
        featuredProducts= await Product.find({isFeatured:true}).lean();

        if(!featuredProducts){
            res.status(404).json({message:"No Featured Products found"})
        }
        await redis.set("featured_products",JSON.stringify(featuredProducts))
        res.json(featuredProducts);
    } catch (error) {
        console.log("Error in getFeaturedProducts controller",error.message)
        res.status(501).json({Success:false,message:"server error",error:error.message})
    }
}

//TODO: does not use cache still.instead use database. when should consider object passing
export const getFeaturedProductByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        // // Create a unique cache key for each category's featured products
        // let cacheKey = `featured_products_${category}`;
        
        // // First, check if the data exists in Redis cache
        // let cachedFeaturedProducts = await redis.get(cacheKey);
        
        // // If cached data exists, return it immediately
        // if (cachedFeaturedProducts) {
        //     return res.json(JSON.parse(cachedFeaturedProducts));
        // }
        
        // If not in cache, query the database
        const featuredProducts = await Product.find({ 
            isFeatured: true, 
            category 
        }).lean();

        // If no featured products found, return 404
        if (!featuredProducts) {
            return res.status(404).json({ 
                message: "No Featured Products found for this category" 
            });
        }

        // Store the results in Redis cache for future quick access
        // await redis.set(
        //     cacheKey, 
        //     JSON.stringify(featuredProducts) // Cache for 1 hour
        // );

        // Return the featured products
        res.json( featuredProducts );
    } catch (error) {
        console.log("Error in getFeaturedProductByCategory controller", error.message);
        res.status(500).json({ 
            Success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
}

export const getProductsById = async (req,res) =>{
    const ID = req.params.id;
    try {
        const product = await Product.findById(ID)
        res.status(201).json({Success:true,product});
    } catch (error) {
        console.log("Error in getItemsById controller ",error.message)
        res.status(500).json({Success:false,message:"Server Error",error:error.message})
    }
}

export const deleteProduct = async (req,res)=>{
    try {
        const Id = req.params.id
        const product = await Product.findById(Id);

        if(!product){
            return res.status(404).json({message:"product not find"})
        }
        if(product.image){
            const publicId = product.image.split("/").pop().split(".")[0];
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`);
                console.log("deleted image from cloudinary")
            } catch (error) {
                console.log("error deleting image from cloudinary",error)
            }
        }
        await Product.findByIdAndDelete(Id);
        res.json({success:true,Message:"Product delete successfully"});
    } catch (error) {
        console.log("Error in deleteProduct controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const updateProduct =async (req,res)=>{

}

async function updateFeaturedProductCache() {
    try {
        // Get all unique categories that have featured products
        const categories = await Product.distinct("category", { isFeatured: true });
        
        // If no categories have featured products, clear all feature product caches
        if (categories.length === 0) {
            // Get all possible cache keys using a pattern (assuming your cache keys follow the format)
            const cachedKeys = await redis.keys("featured_products_*");
            
            // Delete all these keys
            if (cachedKeys.length > 0) {
                await redis.del(...cachedKeys);
            }
            
            // Also clear the general featured products cache
            await redis.del("featured_products");
            return;
        }
        
        // For each category, update its featured products cache
        for (const category of categories) {
            const featuredProducts = await Product.find({ 
                isFeatured: true, 
                category 
            }).lean();
            
            const cacheKey = `featured_products_${category}`;
            
            // If no featured products for this category, remove its cache
            if (featuredProducts.length > 0 ) {
                await redis.del(cacheKey);
            } else {
                // Otherwise, update the cache
                await redis.set(cacheKey, JSON.stringify(featuredProducts));
            }
        }
    } catch (error) {
        console.log("Error in updateFeaturedProductCache function", error.message);
    }
}
// async function updateFeaturedProductCache() {
// 	try {
// 		// The lean() method  is used to return plain JavaScript objects instead of full Mongoose documents. This can significantly improve performance

// 		const featuredProducts = await Product.find({ isFeatured: true }).lean();
// 		await redis.set("featured_products", JSON.stringify(featuredProducts));
// 	} catch (error) {
// 		console.log("error in update cache function");
// 	}
// }
// export const getFeaturedProductByCategory = async (req, res) => {
//     const { category } = req.params;
//     try {
    
//         const featuredProducts = await Product.find({ isFeatured: true, category }).lean();

//         if (!featuredProducts || featuredProducts.length === 0) {
//             return res.status(404).json({ message: "No Featured Products found for this category" });
//         }
        
//         console.log(featuredProducts)
//         res.json({featuredProducts});
//     } catch (error) {
//         console.log("Error in getFeaturedProductByCategory controller", error.message);
//         res.status(501).json({ Success: false, message: "server error", error: error.message });
//     }
// }

export const getRecommendedItems = async (req, res) => {
    try {
        // Check if we have cached recommendations
        const cachedRecommendations = await redis.get("recommended_items");
        if (cachedRecommendations) {
            return res.json({
                success: true,
                recommendedItems: JSON.parse(cachedRecommendations)
            });
        }

        // Get query parameters for filtering
        const { category, maxPrice } = req.query;

        // Build the match stage for aggregation
        const matchStage = {};
        
        if (category) {
            matchStage.category = category;
        }
        
        if (maxPrice) {
            matchStage.price = { $lte: parseFloat(maxPrice) };
        }

        // Aggregate pipeline
        const pipeline = [
            // Match stage (if filters are provided)
            ...(Object.keys(matchStage).length > 0 ? [{ $match: matchStage }] : []),
            
            // Get random samples
            { $sample: { size: 4 } },
            
            // Project only needed fields
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    images: 1,
                    price: 1,
                    category: 1,
                    isFeatured: 1,
                    createdAt: 1
                }
            },

            // Add a field for primary and secondary images
            {
                $addFields: {
                    primaryImage: { $arrayElemAt: ["$images", 0] },
                    secondaryImage: {
                        $cond: {
                            if: { $gte: [{ $size: "$images" }, 2] },
                            then: { $arrayElemAt: ["$images", 1] },
                            else: { $arrayElemAt: ["$images", 0] }
                        }
                    }
                }
            }
        ];

        const recommendedItems = await Product.aggregate(pipeline);

        if (!recommendedItems || recommendedItems.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No recommended items found"
            });
        }

        // Cache only the recommendedItems array
        await redis.set(
            "recommended_items",
            JSON.stringify(recommendedItems),
            'EX',
            3600
        );

        res.json({
            success: true,
            recommendedItems
        });

    } catch (error) {
        console.log("Error in getRecommendedItems controller", error.message);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

// Helper function to update recommended items cache
export const updateRecommendedItemsCache = async () => {
    try {
        // Clear the existing cache
        await redis.del("recommended_items");
        
        console.log("Recommended items cache cleared successfully");
        return true;
    } catch (error) {
        console.log("Error in updateRecommendedItemsCache", error.message);
        return false;
    }
};

// Cloudinary
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv"
dotenv.config();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary;

//Databse
import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected:${conn.connection.host}`)
    } catch (error) {
        console.log("Error connecting to MongoDB",error.message)
        process.exit(1)
    }
}


//Middleware 
import jwt from "jsonwebtoken"
import User from "../models/user.model.js";


export const protectRoute = async (req,res,next)=>{
    try {
        const accessToken= req.cookies.accessToken;

        if(!accessToken){
           return res.status(401).json({message: "Unauthorized - No access token provided"})
        }

        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decoded.userId).select("-password");

            if(!user){
                return res.status(401).json({ message: "User not found" });
            }
            req.user = user;
            next();

        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Unauthorized - Access token expired" });
            }
            throw error;
        }

    } catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        return res.status(401).json({ message: "Unauthorized - Invalid access token" });
    }
}

//One model
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Name is required"]
        },
        description:{
            type:String,
            required:true,
        },
        price:{
            type:Number,
            required:[true,"price is required"]
        },
        images: {
            type: [String], // Array of strings
            required: [true, "At least one image is required"],
            validate: {
                validator: function(v) {
                    return v.length > 0; // Ensures at least one image is provided
                },
                message: 'Product must have at least one image'
            }
        },
        category:{
            type:String,
            required:[true,"category is required"]
        },
        fabricType:{
            type:String,
            required:[true,"fabric is required"]
        },
        color:{
            type:String,
            required:[true,"color is required"]
        },
        isFeatured:{
            type:Boolean,
            default:false,
        }
    },
    {
        timestamps:true,
    }
)

const Product = mongoose.model("Product",productSchema);
export default Product;


//One route
import express from "express"
import {createProducts, getAllProducts, getFeaturedProducts, getFeaturedProductByCategory, toggleFeaturedProduct, deleteProduct, getRecommendedItems, getProductsById} from "../controllers/product.controller.js";
const router = express.Router();

router.get("/", getAllProducts)
router.get("/featured",getFeaturedProducts)
router.get('/recommended-items', getRecommendedItems);
router.get("/category/:category",getFeaturedProductByCategory)
router.get("/:id",getProductsById)
router.post("/",createProducts)
router.patch("/:id",toggleFeaturedProduct)
router.delete("/:id",deleteProduct);

export default router;

// server .js
import express from 'express';
import dotenv from 'dotenv'
dotenv.config()


import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 5000

import authRoutes from "./routes/auth.route.js"
import productRoutes from "./routes/product.route.js"
import cartRoutes from "./routes/cart.route.js"
import paymentRoutes from "./routes/payment.route.js"

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use('/api/auth', authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/payment",paymentRoutes)

app.listen(PORT, () =>{
    console.log("Server running on http://localhost:"+ PORT)
    connectDB();
})

//naveen
//zeMltnJFcNO64Vgs