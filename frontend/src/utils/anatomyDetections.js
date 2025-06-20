// Anatomy Detection Utility for Auto-Fitting Clothes

export const ANATOMY_PRESETS = {
  male: {
    front: {
      shoulders: { x: 0, y: -120, width: 180 },
      chest: { x: 0, y: -60, width: 160 },
      waist: { x: 0, y: -10, width: 140 },
      hips: { x: 0, y: 20, width: 150 },
      thighs: { x: 0, y: 80, width: 120 },
      knees: { x: 0, y: 120, width: 100 },
      ankles: { x: 0, y: 200, width: 80 },
    },
    side: {
      shoulders: { x: 0, y: -120, depth: 40 },
      chest: { x: 0, y: -60, depth: 35 },
      waist: { x: 0, y: -10, depth: 30 },
      hips: { x: 0, y: 20, depth: 32 },
      thighs: { x: 0, y: 80, depth: 28 },
      knees: { x: 0, y: 120, depth: 25 },
      ankles: { x: 0, y: 200, depth: 20 },
    },
  },
  female: {
    front: {
      shoulders: { x: 0, y: -120, width: 160 },
      chest: { x: 0, y: -70, width: 140 },
      waist: { x: 0, y: -20, width: 110 },
      hips: { x: 0, y: 15, width: 160 },
      thighs: { x: 0, y: 75, width: 130 },
      knees: { x: 0, y: 115, width: 95 },
      ankles: { x: 0, y: 195, width: 75 },
    },
  },
}

export const CLOTHING_ANCHOR_RULES = {
  trousers: {
    anchorPoint: "hips",
    offset: { x: 0, y: 0 },
    scale: 1.0,
    fitToWidth: true,
  },
  shirt: {
    anchorPoint: "chest",
    offset: { x: 0, y: -5 },
    scale: 1.0,
    fitToWidth: true,
  },
  jacket: {
    anchorPoint: "shoulders",
    offset: { x: 0, y: -10 },
    scale: 1.05,
    fitToWidth: true,
  },
  longSleeves: {
    anchorPoint: "chest",
    offset: { x: 0, y: -8 },
    scale: 1.02,
    fitToWidth: true,
  },
  accessories: {
    anchorPoint: "waist",
    offset: { x: 0, y: 0 },
    scale: 1.0,
    fitToWidth: false,
  },
}

export const calculateAutoPosition = (clothingType, gender = "male", pose = "front", bodyType = "regular") => {
  const anatomy = ANATOMY_PRESETS[gender]?.[pose] || ANATOMY_PRESETS.male.front
  const rules = CLOTHING_ANCHOR_RULES[clothingType]

  if (!rules || !anatomy[rules.anchorPoint]) {
    return { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 }
  }

  const anchorPoint = anatomy[rules.anchorPoint]

  // Body type adjustments
  const bodyTypeMultipliers = {
    slim: { scale: 0.95, yOffset: -2 },
    regular: { scale: 1.0, yOffset: 0 },
    athletic: { scale: 1.05, yOffset: 1 },
    plus: { scale: 1.1, yOffset: 3 },
  }

  const bodyAdjustment = bodyTypeMultipliers[bodyType] || bodyTypeMultipliers.regular

  return {
    x: anchorPoint.x + rules.offset.x,
    y: anchorPoint.y + rules.offset.y + bodyAdjustment.yOffset,
    scale: rules.scale * bodyAdjustment.scale,
    rotation: 0,
    opacity: 1,
  }
}

export const getClothingFitData = (clothingType, anatomyPoint) => {
  const rules = CLOTHING_ANCHOR_RULES[clothingType]
  if (!rules || !rules.fitToWidth) {
    return { shouldFit: false }
  }

  return {
    shouldFit: true,
    targetWidth: anatomyPoint.width,
    scaleToFit: true,
  }
}
