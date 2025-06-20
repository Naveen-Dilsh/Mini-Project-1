// Perfect Fit Engine - Advanced clothing positioning algorithms

export class PerfectFitEngine {
  constructor() {
    this.measurements = null
    this.clothingCache = new Map()
  }

  // Analyze character image and extract precise measurements
  analyzeCharacter(canvas, ctx, baseImage) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

    // Advanced body detection algorithm
    const bodyPixels = this.detectBodyPixels(data, canvas.width, canvas.height)
    const boundaries = this.calculateBoundaries(bodyPixels)
    const anatomyPoints = this.calculateAnatomyPoints(boundaries, bodyPixels)

    this.measurements = {
      ...boundaries,
      ...anatomyPoints,
      bodyPixels,
      analyzed: true,
      timestamp: Date.now(),
    }

    return this.measurements
  }

  // Detect body pixels using advanced color analysis
  detectBodyPixels(data, width, height) {
    const bodyPixels = []
    const skinTones = this.getSkinToneRanges()

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4
        const r = data[index]
        const g = data[index + 1]
        const b = data[index + 2]
        const alpha = data[index + 3]

        if (alpha > 50 && this.isBodyPixel(r, g, b, skinTones)) {
          bodyPixels.push({ x, y, r, g, b })
        }
      }
    }

    return bodyPixels
  }

  // Calculate precise anatomical points
  calculateAnatomyPoints(boundaries, bodyPixels) {
    const { minX, maxX, minY, maxY } = boundaries
    const height = maxY - minY
    const width = maxX - minX
    const centerX = (minX + maxX) / 2

    // Use golden ratio and human proportions for accuracy
    return {
      head: { x: centerX, y: minY + height * 0.08 },
      neck: { x: centerX, y: minY + height * 0.15 },
      shoulders: { x: centerX, y: minY + height * 0.18, width: width * 0.9 },
      chest: { x: centerX, y: minY + height * 0.35, width: width * 0.85 },
      waist: { x: centerX, y: minY + height * 0.55, width: width * 0.7 },
      hips: { x: centerX, y: minY + height * 0.65, width: width * 0.8 }, // Critical for trousers
      crotch: { x: centerX, y: minY + height * 0.72 },
      knees: { x: centerX, y: minY + height * 0.85, width: width * 0.6 },
      ankles: { x: centerX, y: minY + height * 0.95, width: width * 0.5 },
    }
  }

  // Perfect fitting algorithm for trousers
  calculateTrouserFit(measurements) {
    if (!measurements || !measurements.hips) return null

    const { hips, crotch, ankles, waist } = measurements

    return {
      // Start exactly at hip level
      startPoint: { x: hips.x, y: hips.y - 5 },

      // End at ankle level
      endPoint: { x: ankles.x, y: ankles.y + 10 },

      // Width based on hip measurement
      width: hips.width * 1.1,

      // Height from hips to ankles
      height: (ankles.y - hips.y) * 1.05,

      // Precise positioning
      drawX: hips.x - (hips.width * 1.1) / 2,
      drawY: hips.y - 5,
      drawWidth: hips.width * 1.1,
      drawHeight: (ankles.y - hips.y) * 1.05,

      // Scaling factors
      scaleX: 1.0,
      scaleY: 1.0,

      // Blend settings
      opacity: 0.9,
      blendMode: "multiply",
    }
  }

  // Perfect fitting algorithm for shirts
  calculateShirtFit(measurements) {
    if (!measurements || !measurements.chest) return null

    const { shoulders, chest, waist } = measurements

    return {
      startPoint: { x: shoulders.x, y: shoulders.y - 10 },
      endPoint: { x: waist.x, y: waist.y + 20 },
      width: shoulders.width * 1.15,
      height: (waist.y - shoulders.y) * 1.3,
      drawX: shoulders.x - (shoulders.width * 1.15) / 2,
      drawY: shoulders.y - 10,
      drawWidth: shoulders.width * 1.15,
      drawHeight: (waist.y - shoulders.y) * 1.3,
      scaleX: 1.0,
      scaleY: 1.0,
      opacity: 0.85,
      blendMode: "multiply",
    }
  }

  // Helper methods
  getSkinToneRanges() {
    return [
      { rMin: 180, rMax: 255, gMin: 140, gMax: 220, bMin: 120, bMax: 200 },
      { rMin: 120, rMax: 200, gMin: 80, gMax: 150, bMin: 60, bMax: 120 },
      { rMin: 80, rMax: 150, gMin: 50, gMax: 100, bMin: 30, bMax: 80 },
    ]
  }

  isBodyPixel(r, g, b, skinTones) {
    return skinTones.some(
      (tone) =>
        r >= tone.rMin && r <= tone.rMax && g >= tone.gMin && g <= tone.gMax && b >= tone.bMin && b <= tone.bMax,
    )
  }

  calculateBoundaries(bodyPixels) {
    if (bodyPixels.length === 0) return { minX: 0, maxX: 0, minY: 0, maxY: 0 }

    return bodyPixels.reduce(
      (bounds, pixel) => ({
        minX: Math.min(bounds.minX, pixel.x),
        maxX: Math.max(bounds.maxX, pixel.x),
        minY: Math.min(bounds.minY, pixel.y),
        maxY: Math.max(bounds.maxY, pixel.y),
      }),
      {
        minX: Number.POSITIVE_INFINITY,
        maxX: Number.NEGATIVE_INFINITY,
        minY: Number.POSITIVE_INFINITY,
        maxY: Number.NEGATIVE_INFINITY,
      },
    )
  }
}

export const perfectFitEngine = new PerfectFitEngine()
