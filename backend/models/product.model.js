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
        image:{
            type:String,
            required:[true,"image is required"]
        },
        category:{
            type:String,
            required:[true,"category is required"]
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