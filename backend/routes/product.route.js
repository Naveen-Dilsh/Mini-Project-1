import express from "express"
import {createProducts, getAllProducts, getFeaturedProducts, getFeaturedProductByCategory, toggleFeaturedProduct, deleteProduct, getRecommendedItems, getProductsById} from "../controllers/product.controller.js";
const router = express.Router();

router.get("/", getAllProducts)
router.get("/:id",getProductsById)
router.get("/featured",getFeaturedProducts)
router.get("/category/:category",getFeaturedProductByCategory)
router.post("/",createProducts)
router.patch("/:id",toggleFeaturedProduct)
router.delete("/:id",deleteProduct)
router.get('/recommended-items', getRecommendedItems);

export default router;