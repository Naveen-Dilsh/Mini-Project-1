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