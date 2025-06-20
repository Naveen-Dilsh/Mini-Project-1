import mongoose from "mongoose"

const suitDesignSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    designName: {
      type: String,
      required: true,
      default: "My Suit Design",
    },
    // Jacket Configuration
    jacket: {
      material: {
        type: String,
        required: true,
        enum: ["wool", "cotton", "linen", "silk", "polyester", "cashmere"],
      },
      color: {
        type: String,
        required: true,
      },
      style: {
        type: String,
        required: true,
        enum: ["single-breasted", "double-breasted", "tuxedo", "blazer"],
      },
      lapelStyle: {
        type: String,
        required: true,
        enum: ["notched", "peaked", "shawl"],
      },
      buttonCount: {
        type: Number,
        required: true,
        min: 1,
        max: 4,
      },
    },
    // Trouser Configuration
    trousers: {
      material: {
        type: String,
        required: true,
        enum: ["wool", "cotton", "linen", "silk", "polyester", "cashmere"],
      },
      color: {
        type: String,
        required: true,
      },
      style: {
        type: String,
        required: true,
        enum: ["straight", "slim", "regular", "wide"],
      },
      pleats: {
        type: Boolean,
        default: false,
      },
      cuffs: {
        type: Boolean,
        default: false,
      },
    },
    // Measurements
    measurements: {
      chest: { type: Number, required: true },
      waist: { type: Number, required: true },
      shoulder: { type: Number, required: true },
      armLength: { type: Number, required: true },
      jacketLength: { type: Number, required: true },
      trouserWaist: { type: Number, required: true },
      trouserLength: { type: Number, required: true },
      inseam: { type: Number, required: true },
    },
    // Pricing
    basePrice: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    // Status
    status: {
      type: String,
      enum: ["draft", "saved", "ordered"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  },
)

const SuitDesign = mongoose.model("SuitDesign", suitDesignSchema)
export default SuitDesign
