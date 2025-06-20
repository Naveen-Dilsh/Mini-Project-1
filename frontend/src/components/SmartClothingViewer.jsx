"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useMaterialStore } from "../stores/useMaterialStore"
import { Layers, Settings } from "lucide-react"
import ClothingPositionEditor from "./clothingPositionEditor"

const SmartClothingViewer = ({ gender = "male", pose = "front", bodyType = "regular", showAccessories = true }) => {
  const { currentClothing, updateMaterialPositioning } = useMaterialStore()
  const [isLoading, setIsLoading] = useState(false)
  const [debugMode, setDebugMode] = useState(false)
  const [editingClothing, setEditingClothing] = useState(null)
  const [autoFit, setAutoFit] = useState(true)

  const baseCharacterUrl = `/assets/characters/base/${gender}-base-${pose}.png`

  const clothingLayers = [
    { type: "trousers", zIndex: 1, category: "bottom", color: "#8B4513" },
    { type: "shirt", zIndex: 2, category: "top", color: "#4A90E2" },
    { type: "longSleeves", zIndex: 3, category: "top", color: "#50C878" },
    { type: "jacket", zIndex: 4, category: "outer", color: "#2C3E50" },
  ]

  const getSmartPositioning = (clothing, layerType) => {
    // Get base positioning from database
    const basePositioning = clothing.positioning?.[layerType]?.[pose] || {
      x: 0,
      y: layerType === "trousers" ? 25 : layerType === "jacket" ? -10 : 0,
      scale: layerType === "jacket" ? 1.05 : 1,
      rotation: 0,
      opacity: 1,
      skewX: 0,
      skewY: 0,
    }

    // Apply body type adjustments if auto-fit is enabled
    if (autoFit && clothing.fitData?.bodyTypes?.[bodyType]) {
      const bodyAdjustment = clothing.fitData.bodyTypes[bodyType]
      return {
        ...basePositioning,
        scale: basePositioning.scale * bodyAdjustment.scaleAdjustment,
        x: basePositioning.x + bodyAdjustment.positionAdjustment.x,
        y: basePositioning.y + bodyAdjustment.positionAdjustment.y,
      }
    }

    return basePositioning
  }

  const handlePositionSave = async (clothingId, position) => {
    try {
      await updateMaterialPositioning(clothingId, editingClothing.type, pose, position)
      setEditingClothing(null)
    } catch (error) {
      console.error("Failed to save position:", error)
    }
  }

  const renderClothingLayer = (layer) => {
    const clothing = currentClothing[layer.type]
    if (!clothing) return null

    const positioning = getSmartPositioning(clothing, layer.type)

    const possibleImages = [
      clothing.images?.[layer.type],
      clothing.cloudAssets?.[layer.type],
      clothing.localAssets?.[layer.type],
      `/assets/clothing/${layer.type}/default-${layer.type}.png`,
    ].filter(Boolean)

    const imageUrl = possibleImages[0] || "/placeholder.svg?height=600&width=400"

    return (
      <motion.div
        key={`${layer.type}-${clothing._id}`}
        className="absolute inset-0 flex items-center justify-center"
        style={{
          zIndex: layer.zIndex,
          transform: `translate(${positioning.x}px, ${positioning.y}px) scale(${positioning.scale}) rotate(${positioning.rotation}deg) skew(${positioning.skewX}deg, ${positioning.skewY}deg)`,
          opacity: positioning.opacity,
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: positioning.opacity, scale: positioning.scale }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, delay: layer.zIndex * 0.05 }}
      >
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={`${clothing.name} ${layer.type}`}
          className="h-full w-auto object-contain"
          style={{
            mixBlendMode: debugMode ? "normal" : "multiply",
            border: debugMode ? `2px solid ${layer.color}` : "none",
            filter: layer.type === "trousers" ? "brightness(0.98)" : "none",
          }}
          onLoad={() => setIsLoading(false)}
          onError={(e) => {
            console.error(`Failed to load ${layer.type} asset:`, imageUrl)
            if (possibleImages.length > 1) {
              e.target.src = possibleImages[1] || "/placeholder.svg?height=600&width=400"
            }
          }}
        />

        {debugMode && (
          <>
            <div
              className="absolute top-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs"
              style={{ zIndex: layer.zIndex + 100 }}
            >
              {layer.type} (z:{layer.zIndex})
              <br />
              x:{positioning.x}, y:{positioning.y}
              <br />
              scale:{positioning.scale.toFixed(2)}
            </div>
            <button
              onClick={() => setEditingClothing({ ...clothing, type: layer.type })}
              className="absolute top-2 right-2 bg-blue-600 text-white p-1 rounded text-xs hover:bg-blue-700"
              style={{ zIndex: layer.zIndex + 100 }}
            >
              <Settings className="w-3 h-3" />
            </button>
          </>
        )}
      </motion.div>
    )
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg overflow-hidden">
      {/* Base Character */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={baseCharacterUrl || "/placeholder.svg"}
          alt="Base Character"
          className="h-full w-auto object-contain"
          style={{
            zIndex: 0,
            border: debugMode ? "2px solid #FF0000" : "none",
          }}
          onError={(e) => {
            console.error("Base character not found:", baseCharacterUrl)
            e.target.src = "/placeholder.svg?height=600&width=400"
          }}
        />
        {debugMode && (
          <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs z-10">
            Base Character ({gender}, {pose}, {bodyType})
          </div>
        )}
      </div>

      {/* Clothing Layers */}
      <AnimatePresence mode="wait">{clothingLayers.map(renderClothingLayer)}</AnimatePresence>

      {/* Loading Overlay */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-3 text-sm text-gray-600">Loading assets...</p>
          </div>
        </motion.div>
      )}

      {/* Controls */}
      <div className="absolute top-4 right-4 z-40 flex space-x-2">
        <button
          onClick={() => setAutoFit(!autoFit)}
          className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
            autoFit ? "bg-green-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
          title="Toggle auto-fit"
        >
          Auto-Fit
        </button>
        <button
          onClick={() => setDebugMode(!debugMode)}
          className={`p-2 rounded text-xs font-medium transition-colors ${
            debugMode ? "bg-red-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
          title="Toggle debug mode"
        >
          <Layers className="w-4 h-4" />
        </button>
      </div>

      {/* Asset Info */}
      <div className="absolute bottom-4 left-4 right-4 z-40">
        <div className="bg-white bg-opacity-90 rounded-lg p-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {Object.entries(currentClothing).map(([type, clothing]) => {
              if (!clothing) return null

              const hasValidImage = clothing.images?.[type] || clothing.cloudAssets?.[type]
              const hasPositioning = clothing.positioning?.[type]?.[pose]
              const isLayeredAsset = clothing.assetInfo?.isLayeredAsset

              return (
                <div key={type} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${hasValidImage ? "bg-green-500" : "bg-red-500"}`}></div>
                  <span className="capitalize font-medium">{type}:</span>
                  <span className="text-gray-600 truncate">{clothing.name}</span>
                  {!hasValidImage && <span className="text-red-500 text-xs">⚠️</span>}
                  {hasPositioning && <span className="text-blue-500 text-xs">📐</span>}
                  {isLayeredAsset && <span className="text-green-500 text-xs">✨</span>}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Position Editor Modal */}
      {editingClothing && (
        <ClothingPositionEditor
          clothing={editingClothing}
          onSave={handlePositionSave}
          onClose={() => setEditingClothing(null)}
        />
      )}
    </div>
  )
}

export default SmartClothingViewer
