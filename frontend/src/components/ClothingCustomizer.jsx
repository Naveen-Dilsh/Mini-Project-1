"use client"

import { useState } from "react"
import MaterialSelector from "./MaterialSelector"
import CanvasClothingFitter from "./CanvasClothingFitter"

const ClothingCustomizer = () => {
  const [selectedCategory, setSelectedCategory] = useState("trousers")
  const [gender, setGender] = useState("male")
  const [pose, setPose] = useState("front")

  const categories = [
    { id: "trousers", name: "Trousers", icon: "👖" },
    { id: "shirt", name: "Shirts", icon: "👔" },
    { id: "jacket", name: "Jackets", icon: "🧥" },
    { id: "longSleeves", name: "Long Sleeves", icon: "👕" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
            <h1 className="text-3xl font-bold">Perfect Fit Clothing Designer</h1>
            <p className="text-purple-100 mt-2">Canvas-based pixel-perfect clothing fitting</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Clothing Viewer */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Perfect Fit Preview</h2>
                <div className="flex space-x-2">
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="px-3 py-1 border rounded-lg text-sm"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <select
                    value={pose}
                    onChange={(e) => setPose(e.target.value)}
                    className="px-3 py-1 border rounded-lg text-sm"
                  >
                    <option value="front">Front View</option>
                    <option value="side">Side View</option>
                  </select>
                </div>
              </div>

              <div className="aspect-[2/3] bg-gray-100 rounded-lg overflow-hidden">
                <CanvasClothingFitter gender={gender} pose={pose} />
              </div>
            </div>

            {/* Material Selection */}
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-4">Select Clothing</h2>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedCategory === category.id
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material Selector */}
              <div className="max-h-96 overflow-y-auto">
                <MaterialSelector category={selectedCategory} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClothingCustomizer
