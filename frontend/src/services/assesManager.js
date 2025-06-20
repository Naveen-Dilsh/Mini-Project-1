class AssetManager {
  constructor() {
    this.baseUrl = "/assets"
    this.cache = new Map()
  }

  // Get base character image
  getBaseCharacter(gender = "male", pose = "front") {
    return `${this.baseUrl}/characters/base/${gender}-base-${pose}.png`
  }

  // Get clothing asset path
  getClothingAsset(category, material, color = "default", style = "default") {
    return `${this.baseUrl}/clothing/${category}/materials/${material}/${color}/${style}.png`
  }

  // Get accessory asset path
  getAccessoryAsset(type, style = "default", color = "default") {
    return `${this.baseUrl}/clothing/accessories/${type}/${style}-${color}.png`
  }

  // Get pattern overlay
  getPatternOverlay(patternType, intensity = "medium") {
    return `${this.baseUrl}/patterns/${patternType}/${intensity}.png`
  }

  // Preload assets for better performance
  async preloadAssets(assetPaths) {
    const promises = assetPaths.map((path) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
          this.cache.set(path, img)
          resolve(img)
        }
        img.onerror = reject
        img.src = path
      })
    })

    try {
      await Promise.all(promises)
      console.log("Assets preloaded successfully")
    } catch (error) {
      console.error("Error preloading assets:", error)
    }
  }

  // Get cached asset or load it
  async getAsset(path) {
    if (this.cache.has(path)) {
      return this.cache.get(path)
    }

    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        this.cache.set(path, img)
        resolve(img)
      }
      img.onerror = reject
      img.src = path
    })
  }
}

export default new AssetManager()
