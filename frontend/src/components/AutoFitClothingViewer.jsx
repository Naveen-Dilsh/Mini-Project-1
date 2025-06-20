"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useMaterialStore } from "../stores/useMaterialStroe"
import { Layers } from "lucide-react"

const AutoFitClothingViewer = ({ gender = "male", pose = "front" }) => {
  const { currentClothing } = useMaterialStore()
  const [debugMode, setDebugMode] = useState(false)
  const canvasRef = useRef(null)
  const baseImageRef = useRef(null)

  // Predefined anatomy points for automatic positioning
  const anatomyPoints = {
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
  }

  // Auto-positioning rules for different clothing types
  const clothingRules = {
    trousers: {
      anchorPoint: "hips",
      offset: { x: 0, y: 0 },
      scale: 1.0,
      zIndex: 1,
    },
    shirt: {
      anchorPoint: "chest",
      offset: { x: 0, y: -5 },
      scale: 1.0,
      zIndex: 2,
    },
    jacket: {
      anchorPoint: "shoulders",
      offset: { x: 0, y: -10 },
      scale: 1.05,
      zIndex: 3,
    },
    longSleeves: {
      anchorPoint: "chest",
      offset: { x: 0, y: -8 },
      scale: 1.02,
      zIndex: 2,
    },
  }

  const getAutoPosition = (clothingType) => {
    const rule = clothingRules[clothingType]
    if (!rule) return { x: 0, y: 0, scale: 1, zIndex: 1 }

    const anatomy = anatomyPoints[gender]?.[pose]
    const anchorPoint = anatomy?.[rule.anchorPoint]

    if (!anchorPoint) return { x: 0, y: 0, scale: 1, zIndex: rule.zIndex }

    return {
      x: anchorPoint.x + rule.offset.x,
      y: anchorPoint.y + rule.offset.y,
      scale: rule.scale,
      zIndex: rule.zIndex,
    }
  }

  const renderClothingItem = (clothingType) => {
    const clothing = currentClothing[clothingType]
    if (!clothing) return null

    const position = getAutoPosition(clothingType)

    // Get clothing image URL
    const imageUrl =
      clothing.images?.[clothingType] ||
      clothing.cloudAssets?.[clothingType] ||
      `/placeholder.svg?height=600&width=400&text=${clothingType}`

    return (
      <motion.div
        key={`${clothingType}-${clothing._id}`}
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: position.zIndex }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: position.scale,
          x: position.x,
          y: position.y,
        }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 120,
          damping: 20,
        }}
      >
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={`${clothing.name} ${clothingType}`}
          className="h-full w-auto object-contain"
          style={{
            filter: clothingType === "trousers" ? "brightness(0.98) contrast(1.02)" : "none",
            mixBlendMode: "multiply",
          }}
          onError={(e) => {
            console.error(`Failed to load ${clothingType}:`, imageUrl)
            e.target.src = `/placeholder.svg?height=600&width=400&text=${clothingType}`
          }}
        />

        {debugMode && (
          <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
            {clothingType}
            <br />
            Auto-positioned to {clothingRules[clothingType]?.anchorPoint}
          </div>
        )}
      </motion.div>
    )
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg overflow-hidden">
      {/* Base Character */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          ref={baseImageRef}
          src="/assets/characters/male-base-front.png"
          alt="Base Character"
          className="h-full w-auto object-contain"
          style={{ zIndex: 0 }}
          onError={(e) => {
            console.error("Base character not found")
            e.target.src = "/placeholder.svg?height=600&width=400&text=Base+Character"
          }}
        />

        {/* Debug anatomy points */}
        {debugMode && anatomyPoints[gender]?.[pose] && (
          <div className="absolute inset-0 flex items-center justify-center">
            {Object.entries(anatomyPoints[gender][pose]).map(([point, coords]) => (
              <div
                key={point}
                className="absolute w-3 h-3 bg-red-500 rounded-full border-2 border-white"
                style={{
                  left: `calc(50% + ${coords.x}px)`,
                  top: `calc(50% + ${coords.y}px)`,
                  zIndex: 100,
                }}
              >
                <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-red-600 font-bold bg-white px-1 rounded whitespace-nowrap">
                  {point}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Auto-positioned clothing layers */}
      <AnimatePresence>
        {Object.keys(clothingRules).map((clothingType) => renderClothingItem(clothingType))}
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => setDebugMode(!debugMode)}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            debugMode ? "bg-red-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100 shadow-md"
          }`}
          title="Toggle debug mode"
        >
          <Layers className="w-4 h-4" />
        </button>
      </div>

      {/* Auto-Fit Status */}
      <div className="absolute top-4 left-4 z-50">
        <div className="bg-green-100 border border-green-300 rounded-lg px-3 py-2 shadow-md">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-green-800">Auto-Fit Active</span>
          </div>
        </div>
      </div>

      {/* Current Clothing Info */}
      <div className="absolute bottom-4 left-4 right-4 z-50">
        <div className="bg-white bg-opacity-95 rounded-lg p-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {Object.entries(currentClothing).map(([type, clothing]) => {
              if (!clothing) return null
              const rule = clothingRules[type]
              return (
                <div key={type} className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="capitalize font-medium">{type}:</span>
                  <span className="text-gray-600 truncate flex-1">{clothing.name}</span>
                  {rule && (
                    <span className="text-blue-500 text-xs" title={`Auto-positioned to ${rule.anchorPoint}`}>
                      🎯
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AutoFitClothingViewer
