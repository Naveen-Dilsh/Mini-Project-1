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