import Material from "../models/material.model.js"
import cloudinary from "../lib/cloudinary.js"

export const createMaterial = async (req, res) => {
  try {
    const { name, description, category, basePrice, properties, colors } = req.body
    const { images } = req.body // Base64 images for different clothing pieces

    // Upload images to Cloudinary
    const uploadedImages = {
      shirt: "",
      trousers: "",
      jacket: "",
      longSleeves: "",
      collar: "",
      pockets: "",
      cuffs: "",
      buttons: "",
    }

    if (images) {
      for (const [clothingType, imageData] of Object.entries(images)) {
        if (imageData) {
          const uploadResult = await cloudinary.uploader.upload(imageData, {
            folder: `materials/${category}/${clothingType}`,
            transformation: [{ width: 800, height: 1000, crop: "fit" }, { quality: "auto" }],
          })
          uploadedImages[clothingType] = uploadResult.secure_url
        }
      }
    }

    // Process color variants
    const processedColors = []
    if (colors && colors.length > 0) {
      for (const color of colors) {
        if (color.imageData) {
          const colorUpload = await cloudinary.uploader.upload(color.imageData, {
            folder: `materials/${category}/colors`,
          })
          processedColors.push({
            name: color.name,
            hexCode: color.hexCode,
            imageUrl: colorUpload.secure_url,
          })
        } else {
          processedColors.push({
            name: color.name,
            hexCode: color.hexCode,
            imageUrl: "",
          })
        }
      }
    }

    const material = await Material.create({
      name,
      description,
      category,
      basePrice,
      images: uploadedImages,
      properties,
      colors: processedColors,
      createdBy: req.user._id,
    })

    res.status(201).json({
      success: true,
      material,
    })
  } catch (error) {
    console.log("Error in createMaterial controller", error.message)
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

export const getAllMaterials = async (req, res) => {
  try {
    const { category, isActive } = req.query

    const filter = {}
    if (category) filter.category = category
    if (isActive !== undefined) filter.isActive = isActive === "true"

    const materials = await Material.find(filter).sort({ createdAt: -1 })

    // Ensure all materials have proper image structure
    const transformedMaterials = materials.map((material) => ({
      ...material.toObject(),
      images: material.images || {
        shirt: "",
        trousers: "",
        jacket: "",
        longSleeves: "",
        collar: "",
        pockets: "",
        cuffs: "",
        buttons: "",
      },
    }))

    res.status(200).json({
      success: true,
      materials: transformedMaterials,
    })
  } catch (error) {
    console.log("Error in getAllMaterials controller", error.message)
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

export const getMaterialById = async (req, res) => {
  try {
    const { id } = req.params
    const material = await Material.findById(id)

    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Material not found",
      })
    }

    res.status(200).json({
      success: true,
      material,
    })
  } catch (error) {
    console.log("Error in getMaterialById controller", error.message)
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

export const updateMaterial = async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body

    // Handle image updates if provided
    if (updateData.images) {
      const uploadedImages = {}
      for (const [clothingType, imageData] of Object.entries(updateData.images)) {
        if (imageData && imageData.startsWith("data:")) {
          const uploadResult = await cloudinary.uploader.upload(imageData, {
            folder: `materials/${updateData.category || "general"}/${clothingType}`,
          })
          uploadedImages[clothingType] = uploadResult.secure_url
        } else {
          uploadedImages[clothingType] = imageData // Keep existing URL
        }
      }
      updateData.images = uploadedImages
    }

    const material = await Material.findByIdAndUpdate(id, updateData, { new: true })

    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Material not found",
      })
    }

    res.status(200).json({
      success: true,
      material,
    })
  } catch (error) {
    console.log("Error in updateMaterial controller", error.message)
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

// NEW: Update material positioning
export const updateMaterialPositioning = async (req, res) => {
  try {
    const { id } = req.params
    const { clothingType, pose, positioning } = req.body

    const material = await Material.findById(id)

    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Material not found",
      })
    }

    // Update positioning data
    if (!material.positioning) {
      material.positioning = {}
    }
    if (!material.positioning[clothingType]) {
      material.positioning[clothingType] = {}
    }

    material.positioning[clothingType][pose] = positioning

    await material.save()

    res.status(200).json({
      success: true,
      material,
    })
  } catch (error) {
    console.log("Error in updateMaterialPositioning controller", error.message)
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

export const deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params

    const material = await Material.findByIdAndDelete(id)

    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Material not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Material deleted successfully",
    })
  } catch (error) {
    console.log("Error in deleteMaterial controller", error.message)
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}
