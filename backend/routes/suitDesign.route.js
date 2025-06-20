import express from "express"
import {
  createSuitDesign,
  getUserSuitDesigns,
  getSuitDesignById,
  updateSuitDesign,
  deleteSuitDesign,
} from "../controllers/suitDesign.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router()

router.use(protectRoute) // All routes require authentication

router.post("/", createSuitDesign)
router.get("/", getUserSuitDesigns)
router.get("/:id", getSuitDesignById)
router.put("/:id", updateSuitDesign)
router.delete("/:id", deleteSuitDesign)

export default router
