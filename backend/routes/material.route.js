import express from "express"
import {
  createMaterial,
  getAllMaterials,
  getMaterialById,
  updateMaterial,
  updateMaterialPositioning,
  deleteMaterial,
} from "../controllers/material.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router()

// Public routes
router.get("/", getAllMaterials)
router.get("/:id", getMaterialById)

// Protected routes (require authentication)
router.use(protectRoute)
router.post("/", createMaterial)
router.put("/:id", updateMaterial)
router.put("/:id/positioning", updateMaterialPositioning)
router.delete("/:id", deleteMaterial)

export default router
