import SuitDesign from "../models/suitDesign.model.js"

// Material and style pricing
const PRICING = {
  materials: {
    wool: 200,
    cotton: 150,
    linen: 180,
    silk: 300,
    polyester: 100,
    cashmere: 500,
  },
  styles: {
    "single-breasted": 0,
    "double-breasted": 50,
    tuxedo: 100,
    blazer: -30,
  },
  lapels: {
    notched: 0,
    peaked: 25,
    shawl: 40,
  },
  trouserStyles: {
    straight: 0,
    slim: 20,
    regular: 0,
    wide: 15,
  },
}

const calculatePrice = (design) => {
  let basePrice = 400 // Base suit price

  // Add jacket material cost
  basePrice += PRICING.materials[design.jacket.material] || 0

  // Add jacket style cost
  basePrice += PRICING.styles[design.jacket.style] || 0

  // Add lapel style cost
  basePrice += PRICING.lapels[design.jacket.lapelStyle] || 0

  // Add trouser material cost (50% of jacket material cost)
  basePrice += (PRICING.materials[design.trousers.material] || 0) * 0.5

  // Add trouser style cost
  basePrice += PRICING.trouserStyles[design.trousers.style] || 0

  // Add extras
  if (design.trousers.pleats) basePrice += 30
  if (design.trousers.cuffs) basePrice += 25

  return Math.round(basePrice)
}

export const createSuitDesign = async (req, res) => {
  try {
    const designData = req.body
    designData.userId = req.user._id

    // Calculate pricing
    designData.totalPrice = calculatePrice(designData)
    designData.basePrice = 400

    const suitDesign = await SuitDesign.create(designData)

    res.status(201).json({
      success: true,
      suitDesign,
    })
  } catch (error) {
    console.log("Error in createSuitDesign controller", error.message)
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

export const getUserSuitDesigns = async (req, res) => {
  try {
    const suitDesigns = await SuitDesign.find({ userId: req.user._id }).sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      suitDesigns,
    })
  } catch (error) {
    console.log("Error in getUserSuitDesigns controller", error.message)
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

export const getSuitDesignById = async (req, res) => {
  try {
    const { id } = req.params
    const suitDesign = await SuitDesign.findOne({
      _id: id,
      userId: req.user._id,
    })

    if (!suitDesign) {
      return res.status(404).json({
        success: false,
        message: "Suit design not found",
      })
    }

    res.status(200).json({
      success: true,
      suitDesign,
    })
  } catch (error) {
    console.log("Error in getSuitDesignById controller", error.message)
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

export const updateSuitDesign = async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body

    // Recalculate pricing
    updateData.totalPrice = calculatePrice(updateData)

    const suitDesign = await SuitDesign.findOneAndUpdate({ _id: id, userId: req.user._id }, updateData, { new: true })

    if (!suitDesign) {
      return res.status(404).json({
        success: false,
        message: "Suit design not found",
      })
    }

    res.status(200).json({
      success: true,
      suitDesign,
    })
  } catch (error) {
    console.log("Error in updateSuitDesign controller", error.message)
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

export const deleteSuitDesign = async (req, res) => {
  try {
    const { id } = req.params

    const suitDesign = await SuitDesign.findOneAndDelete({
      _id: id,
      userId: req.user._id,
    })

    if (!suitDesign) {
      return res.status(404).json({
        success: false,
        message: "Suit design not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Suit design deleted successfully",
    })
  } catch (error) {
    console.log("Error in deleteSuitDesign controller", error.message)
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}
