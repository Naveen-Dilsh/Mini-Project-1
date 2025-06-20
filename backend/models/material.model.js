import mongoose from "mongoose"

const materialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["shirt", "trousers", "jacket", "accessories"],
    },
    basePrice: {
      type: Number,
      required: true,
      default: 0,
    },
    images: {
      type: {
        shirt: { type: String, default: "" },
        trousers: { type: String, default: "" },
        jacket: { type: String, default: "" },
        longSleeves: { type: String, default: "" },
        collar: { type: String, default: "" },
        pockets: { type: String, default: "" },
        cuffs: { type: String, default: "" },
        buttons: { type: String, default: "" },
      },
      default: () => ({
        shirt: "",
        trousers: "",
        jacket: "",
        longSleeves: "",
        collar: "",
        pockets: "",
        cuffs: "",
        buttons: "",
      }),
    },
    // Enhanced positioning data for each clothing type and character pose
    positioning: {
      shirt: {
        front: {
          x: { type: Number, default: 0 },
          y: { type: Number, default: -5 },
          scale: { type: Number, default: 1 },
          rotation: { type: Number, default: 0 },
          opacity: { type: Number, default: 1 },
          skewX: { type: Number, default: 0 },
          skewY: { type: Number, default: 0 },
        },
        side: {
          x: { type: Number, default: 0 },
          y: { type: Number, default: -5 },
          scale: { type: Number, default: 1 },
          rotation: { type: Number, default: 0 },
          opacity: { type: Number, default: 1 },
          skewX: { type: Number, default: 0 },
          skewY: { type: Number, default: 0 },
        },
      },
      trousers: {
        front: {
          x: { type: Number, default: 0 },
          y: { type: Number, default: 25 }, // Lower position for trousers
          scale: { type: Number, default: 1 },
          rotation: { type: Number, default: 0 },
          opacity: { type: Number, default: 1 },
          skewX: { type: Number, default: 0 },
          skewY: { type: Number, default: 0 },
        },
        side: {
          x: { type: Number, default: 0 },
          y: { type: Number, default: 25 },
          scale: { type: Number, default: 1 },
          rotation: { type: Number, default: 0 },
          opacity: { type: Number, default: 1 },
          skewX: { type: Number, default: 0 },
          skewY: { type: Number, default: 0 },
        },
      },
      jacket: {
        front: {
          x: { type: Number, default: 0 },
          y: { type: Number, default: -10 },
          scale: { type: Number, default: 1.05 },
          rotation: { type: Number, default: 0 },
          opacity: { type: Number, default: 1 },
          skewX: { type: Number, default: 0 },
          skewY: { type: Number, default: 0 },
        },
        side: {
          x: { type: Number, default: 0 },
          y: { type: Number, default: -10 },
          scale: { type: Number, default: 1.05 },
          rotation: { type: Number, default: 0 },
          opacity: { type: Number, default: 1 },
          skewX: { type: Number, default: 0 },
          skewY: { type: Number, default: 0 },
        },
      },
      longSleeves: {
        front: {
          x: { type: Number, default: 0 },
          y: { type: Number, default: 0 },
          scale: { type: Number, default: 1 },
          rotation: { type: Number, default: 0 },
          opacity: { type: Number, default: 1 },
          skewX: { type: Number, default: 0 },
          skewY: { type: Number, default: 0 },
        },
        side: {
          x: { type: Number, default: 0 },
          y: { type: Number, default: 0 },
          scale: { type: Number, default: 1 },
          rotation: { type: Number, default: 0 },
          opacity: { type: Number, default: 1 },
          skewX: { type: Number, default: 0 },
          skewY: { type: Number, default: 0 },
        },
      },
    },
    // Fit metadata for different body types
    fitData: {
      bodyTypes: {
        slim: {
          scaleAdjustment: { type: Number, default: 0.95 },
          positionAdjustment: { x: { type: Number, default: 0 }, y: { type: Number, default: 0 } },
        },
        regular: {
          scaleAdjustment: { type: Number, default: 1.0 },
          positionAdjustment: { x: { type: Number, default: 0 }, y: { type: Number, default: 0 } },
        },
        athletic: {
          scaleAdjustment: { type: Number, default: 1.05 },
          positionAdjustment: { x: { type: Number, default: 0 }, y: { type: Number, default: 0 } },
        },
      },
      anchorPoints: {
        shoulders: { x: { type: Number, default: 0 }, y: { type: Number, default: -20 } },
        waist: { x: { type: Number, default: 0 }, y: { type: Number, default: 10 } },
        hips: { x: { type: Number, default: 0 }, y: { type: Number, default: 25 } },
        chest: { x: { type: Number, default: 0 }, y: { type: Number, default: -5 } },
      },
    },
    properties: {
      texture: {
        type: String,
        enum: ["smooth", "textured", "rough", "silky"],
        default: "smooth",
      },
      pattern: {
        type: String,
        enum: ["solid", "striped", "checkered", "dotted", "floral"],
        default: "solid",
      },
      weight: {
        type: String,
        enum: ["light", "medium", "heavy"],
        default: "medium",
      },
      stretch: {
        type: Boolean,
        default: false,
      },
    },
    colors: [
      {
        name: String,
        hexCode: String,
        localPath: String,
        cloudUrl: String,
      },
    ],
    assetInfo: {
      resolution: {
        type: String,
        default: "1024x1024",
      },
      format: {
        type: String,
        default: "PNG",
      },
      hasTransparency: {
        type: Boolean,
        default: true,
      },
      layerOrder: {
        type: Number,
        default: 1,
      },
      isLayeredAsset: {
        type: Boolean,
        default: false, // Set to true for properly designed layered assets
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Material = mongoose.model("Material", materialSchema)
export default Material
