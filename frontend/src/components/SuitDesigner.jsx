"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Save, RotateCcw, Ruler, Shirt, Package } from "lucide-react"
import Suit3DModel from "./Suit3DModel"
import { useSuitDesignStore } from "../stores/useSuitDesignStore"
import { useUserStore } from "../stores/useUserStore"
import toast from "react-hot-toast"

const SuitDesigner = () => {
  const { user } = useUserStore()
  const { defaultDesign, createSuitDesign, updateSuitDesign, currentDesign, setCurrentDesign, loading } =
    useSuitDesignStore()

  const [design, setDesign] = useState(defaultDesign)
  const [activeTab, setActiveTab] = useState("jacket")
  const [estimatedPrice, setEstimatedPrice] = useState(400)

  useEffect(() => {
    if (currentDesign) {
      setDesign(currentDesign)
    }
  }, [currentDesign])

  // Calculate estimated price based on selections
  useEffect(() => {
    const materialPrices = {
      wool: 200,
      cotton: 150,
      linen: 180,
      silk: 300,
      polyester: 100,
      cashmere: 500,
    }

    const stylePrices = {
      "single-breasted": 0,
      "double-breasted": 50,
      tuxedo: 100,
      blazer: -30,
    }

    let basePrice = 400
    basePrice += materialPrices[design.jacket.material] || 0
    basePrice += materialPrices[design.trousers.material] * 0.5 || 0
    basePrice += stylePrices[design.jacket.style] || 0

    if (design.trousers.pleats) basePrice += 30
    if (design.trousers.cuffs) basePrice += 25

    setEstimatedPrice(Math.round(basePrice))
  }, [design])

  const handleDesignChange = (category, field, value) => {
    setDesign((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }))
  }

  const handleMeasurementChange = (field, value) => {
    setDesign((prev) => ({
      ...prev,
      measurements: {
        ...prev.measurements,
        [field]: Number.parseFloat(value) || 0,
      },
    }))
  }

  const handleSaveDesign = async () => {
    if (!user) {
      toast.error("Please login to save your design")
      return
    }

    try {
      if (currentDesign?._id) {
        await updateSuitDesign(currentDesign._id, design)
      } else {
        await createSuitDesign(design)
      }
    } catch (error) {
      console.error("Error saving design:", error)
    }
  }

  const resetDesign = () => {
    setDesign(defaultDesign)
    setCurrentDesign(null)
  }

  const materials = [
    { value: "wool", label: "Wool", description: "Classic and durable" },
    { value: "cotton", label: "Cotton", description: "Breathable and comfortable" },
    { value: "linen", label: "Linen", description: "Light and airy" },
    { value: "silk", label: "Silk", description: "Luxurious and smooth" },
    { value: "polyester", label: "Polyester", description: "Affordable and wrinkle-resistant" },
    { value: "cashmere", label: "Cashmere", description: "Premium and soft" },
  ]

  const colors = [
    "#1a1a1a",
    "#2d2d2d",
    "#4a4a4a",
    "#1e3a8a",
    "#1e40af",
    "#374151",
    "#6b7280",
    "#8b5cf6",
    "#7c3aed",
    "#059669",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Design Your Perfect Wedding Suit</h1>
          <p className="text-xl text-gray-600">Create a custom suit tailored to your style and measurements</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 3D Model Viewer */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">3D Preview</h2>
              <div className="text-right">
                <p className="text-sm text-gray-600">Estimated Price</p>
                <p className="text-2xl font-bold text-green-600">${estimatedPrice}</p>
              </div>
            </div>

            <Suit3DModel design={design} />

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSaveDesign}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Save size={20} />
                {loading ? "Saving..." : "Save Design"}
              </button>
              <button
                onClick={resetDesign}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <RotateCcw size={20} />
                Reset
              </button>
            </div>
          </motion.div>

          {/* Design Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-6">
              {[
                { id: "jacket", label: "Jacket", icon: Shirt },
                { id: "trousers", label: "Trousers", icon: Package },
                { id: "measurements", label: "Measurements", icon: Ruler },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors ${
                    activeTab === id ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
            </div>

            {/* Jacket Configuration */}
            {activeTab === "jacket" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Material</label>
                  <div className="grid grid-cols-2 gap-3">
                    {materials.map((material) => (
                      <button
                        key={material.value}
                        onClick={() => handleDesignChange("jacket", "material", material.value)}
                        className={`p-3 border rounded-lg text-left transition-colors ${
                          design.jacket.material === material.value
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-medium">{material.label}</div>
                        <div className="text-sm text-gray-600">{material.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Color</label>
                  <div className="flex flex-wrap gap-3">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleDesignChange("jacket", "color", color)}
                        className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${
                          design.jacket.color === color ? "border-blue-500 scale-110" : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Style</label>
                  <select
                    value={design.jacket.style}
                    onChange={(e) => handleDesignChange("jacket", "style", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="single-breasted">Single Breasted</option>
                    <option value="double-breasted">Double Breasted</option>
                    <option value="tuxedo">Tuxedo</option>
                    <option value="blazer">Blazer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Lapel Style</label>
                  <select
                    value={design.jacket.lapelStyle}
                    onChange={(e) => handleDesignChange("jacket", "lapelStyle", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="notched">Notched</option>
                    <option value="peaked">Peaked</option>
                    <option value="shawl">Shawl</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Button Count</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map((count) => (
                      <button
                        key={count}
                        onClick={() => handleDesignChange("jacket", "buttonCount", count)}
                        className={`px-4 py-2 border rounded-lg transition-colors ${
                          design.jacket.buttonCount === count
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Trousers Configuration */}
            {activeTab === "trousers" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Material</label>
                  <div className="grid grid-cols-2 gap-3">
                    {materials.map((material) => (
                      <button
                        key={material.value}
                        onClick={() => handleDesignChange("trousers", "material", material.value)}
                        className={`p-3 border rounded-lg text-left transition-colors ${
                          design.trousers.material === material.value
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-medium">{material.label}</div>
                        <div className="text-sm text-gray-600">{material.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Color</label>
                  <div className="flex flex-wrap gap-3">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleDesignChange("trousers", "color", color)}
                        className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${
                          design.trousers.color === color ? "border-blue-500 scale-110" : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Style</label>
                  <select
                    value={design.trousers.style}
                    onChange={(e) => handleDesignChange("trousers", "style", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="straight">Straight</option>
                    <option value="slim">Slim</option>
                    <option value="regular">Regular</option>
                    <option value="wide">Wide</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="pleats"
                      checked={design.trousers.pleats}
                      onChange={(e) => handleDesignChange("trousers", "pleats", e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="pleats" className="ml-2 block text-sm text-gray-700">
                      Add Pleats (+$30)
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="cuffs"
                      checked={design.trousers.cuffs}
                      onChange={(e) => handleDesignChange("trousers", "cuffs", e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="cuffs" className="ml-2 block text-sm text-gray-700">
                      Add Cuffs (+$25)
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Measurements */}
            {activeTab === "measurements" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(design.measurements).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")} (inches)
                      </label>
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => handleMeasurementChange(key, e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min="0"
                        step="0.5"
                      />
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Measurement Guide</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Chest: Measure around the fullest part of your chest</li>
                    <li>• Waist: Measure around your natural waistline</li>
                    <li>• Shoulder: Measure from shoulder point to shoulder point</li>
                    <li>• Arm Length: Measure from shoulder to wrist</li>
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default SuitDesigner
