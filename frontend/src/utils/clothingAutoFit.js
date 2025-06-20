// Auto-fit utility functions for clothing positioning

export const ANATOMY_POINTS = {
  male: {
    front: {
      shoulders: { x: 0, y: -120, width: 180 },
      chest: { x: 0, y: -60, width: 160 },
      waist: { x: 0, y: -10, width: 140 },
      hips: { x: 0, y: 20, width: 150 },
      knees: { x: 0, y: 120, width: 100 },
      ankles: { x: 0, y: 200, width: 80 },
    },
  },
  female: {
    front: {
      shoulders: { x: 0, y: -120, width: 160 },
      chest: { x: 0, y: -70, width: 140 },
      waist: { x: 0, y: -20, width: 110 },
      hips: { x: 0, y: 15, width: 160 },
      knees: { x: 0, y: 115, width: 95 },
      ankles: { x: 0, y: 195, width: 75 },
    },
  },
}

export const CLOTHING_RULES = {
  trousers: {
    anchorPoint: "hips",
    offset: { x: 0, y: 0 },
    scale: 1.0,
    zIndex: 1,
    description: "Auto-aligns to hip level",
  },
  shirt: {
    anchorPoint: "chest",
    offset: { x: 0, y: -5 },
    scale: 1.0,
    zIndex: 2,
    description: "Positions at chest level",
  },
  jacket: {
    anchorPoint: "shoulders",
    offset: { x: 0, y: -10 },
    scale: 1.05,
    zIndex: 3,
    description: "Anchors to shoulders",
  },
  longSleeves: {
    anchorPoint: "chest",
    offset: { x: 0, y: -8 },
    scale: 1.02,
    zIndex: 2,
    description: "Positions at chest level",
  },
}

export const calculateAutoPosition = (clothingType, gender = "male", pose = "front") => {
  const rule = CLOTHING_RULES[clothingType]
  if (!rule) return { x: 0, y: 0, scale: 1, zIndex: 1 }

  const anatomy = ANATOMY_POINTS[gender]?.[pose]
  const anchorPoint = anatomy?.[rule.anchorPoint]

  if (!anchorPoint) return { x: 0, y: 0, scale: 1, zIndex: rule.zIndex }

  return {
    x: anchorPoint.x + rule.offset.x,
    y: anchorPoint.y + rule.offset.y,
    scale: rule.scale,
    zIndex: rule.zIndex,
  }
}

export const getClothingDescription = (clothingType) => {
  return CLOTHING_RULES[clothingType]?.description || "Auto-positioned"
}
