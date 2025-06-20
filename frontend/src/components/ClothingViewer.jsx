"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useMaterialStore } from "../stores/useMaterialStore"

const ClothingViewer = ({ baseCharacterUrl = "/placeholder.svg?height=600&width=400" }) => {
  const { currentClothing } = useMaterialStore()
  const [isLoading, setIsLoading] = useState(false)

  // Clothing layers in order (bottom to top)
  const clothingLayers = [
    { type: "trousers", zIndex: 1 },
    { type: "shirt", zIndex: 2 },
    { type: "longSleeves", zIndex: 3 },
    { type: "jacket", zIndex: 4 },
  ]

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg overflow-hidden">
      {/* Base Character */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={baseCharacterUrl || "/placeholder.svg"}
          alt="Base Character"
          className="h-full w-auto object-contain"
          style={{ zIndex: 0 }}
        />
      </div>

      {/* Clothing Layers */}
      <AnimatePresence>
        {clothingLayers.map(({ type, zIndex }) => {
          const clothing = currentClothing[type]
          if (!clothing) return null

          return (
            <motion.div
              key={`${type}-${clothing._id}`}
              className="absolute inset-0 flex items-center justify-center"
              style={{ zIndex }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={clothing.images[type] || clothing.images.shirt}
                alt={`${clothing.name} ${type}`}
                className="h-full w-auto object-contain"
                onLoad={() => setIsLoading(false)}
                onLoadStart={() => setIsLoading(true)}
              />
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600">Loading...</p>
          </div>
        </div>
      )}

      {/* Clothing Info Overlay */}
      <div className="absolute bottom-4 left-4 right-4 z-40">
        <div className="bg-white bg-opacity-90 rounded-lg p-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {Object.entries(currentClothing).map(([type, clothing]) => {
              if (!clothing) return null
              return (
                <div key={type} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="capitalize font-medium">{type}:</span>
                  <span className="text-gray-600">{clothing.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClothingViewer
