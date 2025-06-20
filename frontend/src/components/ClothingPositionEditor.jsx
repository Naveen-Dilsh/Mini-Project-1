"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ZoomIn, ZoomOut, Save, Grid } from "lucide-react"

const ClothingPositionEditor = ({ clothing, onSave, onClose }) => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0,
    opacity: 1,
    skewX: 0,
    skewY: 0,
  })

  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [showGrid, setShowGrid] = useState(true)
  const containerRef = useRef(null)

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return

    setPosition((prev) => ({
      ...prev,
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    }))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, dragStart])

  const adjustPosition = (property, delta) => {
    setPosition((prev) => ({
      ...prev,
      [property]: prev[property] + delta,
    }))
  }

  const resetPosition = () => {
    setPosition({
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      opacity: 1,
      skewX: 0,
      skewY: 0,
    })
  }

  const savePosition = () => {
    onSave(clothing._id, position)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-6xl w-full mx-4 max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Position Clothing: {clothing.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Preview Area */}
          <div className="lg:col-span-3">
            <div
              ref={containerRef}
              className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300"
            >
              {/* Grid Overlay */}
              {showGrid && (
                <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
                  <svg className="w-full h-full opacity-20">
                    <defs>
                      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#666" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>
              )}

              {/* Base Character */}
              <img
                src="/assets/characters/base/male-base-front.png"
                alt="Base Character"
                className="absolute inset-0 w-full h-full object-contain"
                style={{ zIndex: 1 }}
                onError={(e) => {
                  e.target.src = "/placeholder.svg?height=600&width=400"
                }}
              />

              {/* Clothing Layer */}
              <motion.div
                className="absolute inset-0 cursor-move"
                style={{
                  zIndex: 2,
                  transform: `translate(${position.x}px, ${position.y}px) scale(${position.scale}) rotate(${position.rotation}deg) skew(${position.skewX}deg, ${position.skewY}deg)`,
                  opacity: position.opacity,
                }}
                onMouseDown={handleMouseDown}
              >
                <img
                  src={clothing.images?.trousers || clothing.images?.shirt || "/placeholder.svg"}
                  alt={clothing.name}
                  className="w-full h-full object-contain"
                  style={{ pointerEvents: "none" }}
                />
              </motion.div>

              {/* Position Indicators */}
              <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                X: {position.x.toFixed(0)}, Y: {position.y.toFixed(0)}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            {/* Position Controls */}
            <div>
              <label className="block text-sm font-medium mb-2">Position</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => adjustPosition("y", -5)}
                  className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 flex items-center justify-center"
                >
                  ↑
                </button>
                <div></div>
                <div></div>
                <button
                  onClick={() => adjustPosition("x", -5)}
                  className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 flex items-center justify-center"
                >
                  ←
                </button>
                <button onClick={resetPosition} className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-xs">
                  Reset
                </button>
                <button
                  onClick={() => adjustPosition("x", 5)}
                  className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 flex items-center justify-center"
                >
                  →
                </button>
                <div></div>
                <button
                  onClick={() => adjustPosition("y", 5)}
                  className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 flex items-center justify-center"
                >
                  ↓
                </button>
                <div></div>
              </div>
            </div>

            {/* Scale Controls */}
            <div>
              <label className="block text-sm font-medium mb-2">Scale</label>
              <div className="flex space-x-2">
                <button
                  onClick={() => adjustPosition("scale", -0.05)}
                  className="flex-1 px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 flex items-center justify-center"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="px-3 py-2 bg-gray-50 rounded text-center min-w-16">{position.scale.toFixed(2)}x</span>
                <button
                  onClick={() => adjustPosition("scale", 0.05)}
                  className="flex-1 px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 flex items-center justify-center"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Rotation Controls */}
            <div>
              <label className="block text-sm font-medium mb-2">Rotation</label>
              <div className="flex space-x-2">
                <button
                  onClick={() => adjustPosition("rotation", -5)}
                  className="flex-1 px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
                >
                  ↺ -5°
                </button>
                <span className="px-3 py-2 bg-gray-50 rounded text-center min-w-16">{position.rotation}°</span>
                <button
                  onClick={() => adjustPosition("rotation", 5)}
                  className="flex-1 px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
                >
                  ↻ +5°
                </button>
              </div>
            </div>

            {/* Skew Controls */}
            <div>
              <label className="block text-sm font-medium mb-2">Skew</label>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <button
                    onClick={() => adjustPosition("skewX", -1)}
                    className="flex-1 px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 text-xs"
                  >
                    X-
                  </button>
                  <span className="px-2 py-1 bg-gray-50 rounded text-center text-xs min-w-12">{position.skewX}°</span>
                  <button
                    onClick={() => adjustPosition("skewX", 1)}
                    className="flex-1 px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 text-xs"
                  >
                    X+
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => adjustPosition("skewY", -1)}
                    className="flex-1 px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 text-xs"
                  >
                    Y-
                  </button>
                  <span className="px-2 py-1 bg-gray-50 rounded text-center text-xs min-w-12">{position.skewY}°</span>
                  <button
                    onClick={() => adjustPosition("skewY", 1)}
                    className="flex-1 px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 text-xs"
                  >
                    Y+
                  </button>
                </div>
              </div>
            </div>

            {/* Opacity Controls */}
            <div>
              <label className="block text-sm font-medium mb-2">Opacity</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={position.opacity}
                onChange={(e) => setPosition((prev) => ({ ...prev, opacity: Number.parseFloat(e.target.value) }))}
                className="w-full"
              />
              <span className="text-sm text-gray-600">{Math.round(position.opacity * 100)}%</span>
            </div>

            {/* Toggle Controls */}
            <div className="space-y-2">
              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`w-full px-3 py-2 rounded text-sm font-medium transition-colors ${
                  showGrid ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Grid className="w-4 h-4 inline mr-2" />
                {showGrid ? "Hide Grid" : "Show Grid"}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 pt-4">
              <button
                onClick={savePosition}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClothingPositionEditor
