// Asset Requirements for Layered Clothing System

export const ASSET_REQUIREMENTS = {
  baseCharacter: {
    format: "PNG",
    transparency: false,
    resolution: "1024x1024",
    pose: "front-facing",
    description: "Base character model without clothing",
  },

  clothingLayers: {
    format: "PNG",
    transparency: true, // CRITICAL: Must have transparent background
    resolution: "1024x1024", // Must match base character exactly
    alignment: "Must align perfectly with base character pose",
    requirements: [
      "Transparent background (no white/colored background)",
      "Same lighting and perspective as base character",
      "Exact same body proportions and pose",
      "Proper layering order (trousers behind shirts, etc.)",
    ],
  },

  layerOrder: {
    trousers: 1, // Bottom layer
    shirt: 2, // Middle layer
    longSleeves: 3, // Upper middle
    jacket: 4, // Top layer
    accessories: 5, // Overlay details
  },
}

// Asset naming convention
export const ASSET_NAMING = {
  pattern: "{category}-{material}-{color}-{style}-layer.png",
  examples: [
    "trousers-cotton-black-slim-layer.png",
    "shirt-cotton-white-formal-layer.png",
    "jacket-wool-navy-blazer-layer.png",
  ],
}
