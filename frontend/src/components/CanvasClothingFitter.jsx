"use client"

import { useState, useRef, useEffect } from "react"
import { useMaterialStore } from "../stores/useMaterialStroe"
import { Layers, Target, Zap, RefreshCw } from "lucide-react"

const CanvasClothingFitter = ({ gender = "male", pose = "front" }) => {
  const { currentClothing } = useMaterialStore()
  const canvasRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [debugMode, setDebugMode] = useState(false)
  const [error, setError] = useState(null)
  const [characterMeasurements, setCharacterMeasurements] = useState(null)

  // Simplified base character URLs with fallbacks
  const getBaseCharacterUrl = () => {
    const urls = ["/assets/characters/male-base-front.png", "/placeholder.svg?height=600&width=400&text=Base+Character"]
    return urls
  }

  // Simple anatomy points based on canvas dimensions
  const getAnatomyPoints = (canvasWidth, canvasHeight) => {
    const centerX = canvasWidth / 2
    const measurements = {
      shoulders: { x: centerX, y: canvasHeight * 0.18 },
      chest: { x: centerX, y: canvasHeight * 0.35 },
      waist: { x: centerX, y: canvasHeight * 0.55 },
      hips: { x: centerX, y: canvasHeight * 0.65 }, // Key point for trousers
      knees: { x: centerX, y: canvasHeight * 0.85 },
      ankles: { x: centerX, y: canvasHeight * 0.95 },
      width: canvasWidth * 0.6,
    }
    return measurements
  }

  // Simplified clothing positioning
  const getClothingPosition = (clothingType, canvasWidth, canvasHeight) => {
    const anatomy = getAnatomyPoints(canvasWidth, canvasHeight)

    const positions = {
      trousers: {
        x: anatomy.hips.x - anatomy.width / 2,
        y: anatomy.hips.y - 20,
        width: anatomy.width,
        height: anatomy.ankles.y - anatomy.hips.y + 40,
      },
      shirt: {
        x: anatomy.chest.x - anatomy.width / 2,
        y: anatomy.shoulders.y,
        width: anatomy.width,
        height: anatomy.waist.y - anatomy.shoulders.y + 40,
      },
      jacket: {
        x: anatomy.shoulders.x - anatomy.width / 2,
        y: anatomy.shoulders.y - 20,
        width: anatomy.width * 1.1,
        height: anatomy.waist.y - anatomy.shoulders.y + 60,
      },
    }

    return positions[clothingType] || positions.shirt
  }

  // Main render function
  const renderCanvas = async () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    canvas.width = 400
    canvas.height = 600

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "#f3f4f6"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    try {
      // Load and draw base character
      const baseImage = await loadImage(getBaseCharacterUrl())
      ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height)

      // Set measurements
      if (!characterMeasurements) {
        setCharacterMeasurements(getAnatomyPoints(canvas.width, canvas.height))
      }

      // Draw clothing items
      for (const [clothingType, clothingData] of Object.entries(currentClothing)) {
        if (clothingData) {
          await drawClothing(ctx, clothingType, clothingData, canvas.width, canvas.height)
        }
      }

      // Draw debug overlay
      if (debugMode) {
        drawDebugOverlay(ctx, canvas.width, canvas.height)
      }

      setIsLoaded(true)
      setError(null)
    } catch (err) {
      console.error("Canvas render error:", err)
      setError(err.message)

      // Draw error state
      ctx.fillStyle = "#ef4444"
      ctx.font = "16px Arial"
      ctx.textAlign = "center"
      ctx.fillText("Failed to load character", canvas.width / 2, canvas.height / 2)
      ctx.fillText("Click refresh to retry", canvas.width / 2, canvas.height / 2 + 30)
    }
  }

  // Load image with fallbacks
  const loadImage = (urls) => {
    return new Promise((resolve, reject) => {
      let currentIndex = 0

      const tryLoad = () => {
        if (currentIndex >= urls.length) {
          reject(new Error("All image sources failed"))
          return
        }

        const img = new Image()
        img.crossOrigin = "anonymous"

        img.onload = () => resolve(img)
        img.onerror = () => {
          currentIndex++
          tryLoad()
        }

        img.src = urls[currentIndex]
      }

      tryLoad()
    })
  }

  // Draw clothing item
  const drawClothing = async (ctx, clothingType, clothingData, canvasWidth, canvasHeight) => {
    try {
      const position = getClothingPosition(clothingType, canvasWidth, canvasHeight)

      const imageUrls = [
        clothingData.images?.[clothingType],
        clothingData.cloudAssets?.[clothingType],
        `/placeholder.svg?height=400&width=300&text=${clothingType}&bg=cccccc`,
      ].filter(Boolean)

      const clothingImage = await loadImage(imageUrls)

      // Set blend mode for realistic appearance
      ctx.globalCompositeOperation = "source-over"
      ctx.globalAlpha = 0.9

      // Draw the clothing
      ctx.drawImage(clothingImage, position.x, position.y, position.width, position.height)

      // Reset context
      ctx.globalCompositeOperation = "source-over"
      ctx.globalAlpha = 1.0
    } catch (err) {
      console.error(`Failed to draw ${clothingType}:`, err)
    }
  }

  // Debug overlay
  const drawDebugOverlay = (ctx, canvasWidth, canvasHeight) => {
    const anatomy = getAnatomyPoints(canvasWidth, canvasHeight)

    ctx.strokeStyle = "#00ff00"
    ctx.lineWidth = 2
    ctx.font = "12px Arial"
    ctx.fillStyle = "#000000"

    // Draw anatomy points
    Object.entries(anatomy).forEach(([point, pos]) => {
      if (pos.x !== undefined && pos.y !== undefined) {
        // Draw point
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, 5, 0, 2 * Math.PI)
        ctx.stroke()

        // Draw label
        ctx.fillText(point, pos.x + 10, pos.y - 5)

        // Draw horizontal line
        ctx.beginPath()
        ctx.moveTo(0, pos.y)
        ctx.lineTo(canvasWidth, pos.y)
        ctx.stroke()
      }
    })
  }

  // Initialize canvas
  useEffect(() => {
    renderCanvas()
  }, [])

  // Re-render when clothing changes
  useEffect(() => {
    if (isLoaded) {
      renderCanvas()
    }
  }, [currentClothing, debugMode])

  return (
    <div className="relative w-full h-full bg-gray-200 rounded-lg overflow-hidden">
      {/* Canvas */}
      <canvas ref={canvasRef} className="w-full h-full object-contain cursor-pointer" onClick={renderCanvas} />

      {/* Loading State */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading Perfect Fit Engine...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50">
          <div className="text-center p-4">
            <div className="text-red-600 mb-4">⚠️ Loading Error</div>
            <p className="text-sm text-red-500 mb-4">{error}</p>
            <button onClick={renderCanvas} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              <RefreshCw className="w-4 h-4 inline mr-2" />
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="absolute top-4 right-4 z-50 flex space-x-2">
        <button
          onClick={() => setDebugMode(!debugMode)}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            debugMode ? "bg-green-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100 shadow-md"
          }`}
          title="Toggle debug mode"
        >
          <Layers className="w-4 h-4" />
        </button>

        <button
          onClick={renderCanvas}
          className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow-md"
          title="Refresh canvas"
        >
          <Target className="w-4 h-4" />
        </button>
      </div>

      {/* Status */}
      <div className="absolute top-4 left-4 z-50">
        <div
          className={`px-3 py-2 rounded-lg shadow-md ${
            isLoaded ? "bg-green-100 border border-green-300" : "bg-yellow-100 border border-yellow-300"
          }`}
        >
          <div className="flex items-center space-x-2">
            <Zap className={`w-4 h-4 ${isLoaded ? "text-green-600" : "text-yellow-600"}`} />
            <span className={`text-xs font-medium ${isLoaded ? "text-green-800" : "text-yellow-800"}`}>
              {isLoaded ? "Perfect Fit Ready" : "Loading..."}
            </span>
          </div>
        </div>
      </div>

      {/* Clothing Status */}
      <div className="absolute bottom-4 right-4 z-50">
        <div className="bg-white bg-opacity-95 rounded-lg p-3 shadow-lg max-w-xs">
          <div className="text-xs space-y-1">
            {Object.entries(currentClothing).map(([type, clothing]) => {
              if (!clothing) return null
              return (
                <div key={type} className="flex items-center justify-between">
                  <span className="capitalize font-medium">{type}:</span>
                  <span className="text-green-600">✓ Fitted</span>
                </div>
              )
            })}
            {Object.keys(currentClothing).filter((key) => currentClothing[key]).length === 0 && (
              <div className="text-gray-500 text-center">Select clothing to see perfect fit</div>
            )}
          </div>
        </div>
      </div>

      {/* Debug Info */}
      {debugMode && characterMeasurements && (
        <div className="absolute bottom-4 left-4 z-50">
          <div className="bg-black bg-opacity-75 text-white rounded-lg p-3 text-xs">
            <div className="font-bold mb-2">Canvas Info:</div>
            <div>Canvas: 400x600px</div>
            <div>Hip Level: {Math.round(characterMeasurements.hips.y)}px</div>
            <div>Character Width: {Math.round(characterMeasurements.width)}px</div>
            <div>Status: {isLoaded ? "Loaded" : "Loading"}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CanvasClothingFitter
