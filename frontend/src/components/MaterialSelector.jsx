"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useMaterialStore } from "../stores/useMaterialStroe"
import { Search, Grid, List } from "lucide-react"
import { SAMPLE_TROUSERS, SAMPLE_SHIRTS } from "../utils/sampleTrousers"

const MaterialSelector = ({ category = "trousers" }) => {
  const { materials, fetchMaterials, setCurrentClothing, loading } = useMaterialStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [viewMode, setViewMode] = useState("grid")

  useEffect(() => {
    fetchMaterials(category)
  }, [category, fetchMaterials])

  // Use sample data if no materials are loaded
  const getSampleData = (category) => {
    switch (category) {
      case "trousers":
        return SAMPLE_TROUSERS
      case "shirt":
        return SAMPLE_SHIRTS
      default:
        return []
    }
  }

  const displayMaterials = materials.length > 0 ? materials : getSampleData(category)

  const filteredMaterials = displayMaterials.filter((material) => {
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === "all" || material.properties.pattern === selectedFilter
    return matchesSearch && matchesFilter
  })

  const handleMaterialSelect = (material) => {
    setCurrentClothing(category, material)

    // Show success notification
    if (category === "trousers") {
      console.log(`🎯 ${material.name} automatically positioned to hip level!`)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Sample Data Notice */}
      {materials.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-xs text-yellow-800">
            <strong>Demo Mode:</strong> Using sample {category} data. Click any item to see auto-fit in action!
          </p>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Patterns</option>
          <option value="solid">Solid</option>
          <option value="striped">Striped</option>
          <option value="checkered">Checkered</option>
        </select>

        <div className="flex border border-gray-300 rounded-lg overflow-hidden">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 ${viewMode === "grid" ? "bg-blue-500 text-white" : "bg-white text-gray-600"}`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 ${viewMode === "list" ? "bg-blue-500 text-white" : "bg-white text-gray-600"}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Materials Grid/List */}
      <div className={viewMode === "grid" ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" : "space-y-2"}>
        {filteredMaterials.map((material) => (
          <MaterialCard
            key={material._id}
            material={material}
            viewMode={viewMode}
            category={category}
            onSelect={() => handleMaterialSelect(material)}
          />
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No materials found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

const MaterialCard = ({ material, viewMode, category, onSelect }) => {
  const imageUrl = material.images?.[category] || "/placeholder.svg?height=200&width=150"

  if (viewMode === "list") {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
        onClick={onSelect}
      >
        <img src={imageUrl || "/placeholder.svg"} alt={material.name} className="w-16 h-20 object-cover rounded" />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{material.name}</h3>
          <p className="text-sm text-gray-600">{material.description}</p>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-sm font-medium text-blue-600">${material.basePrice}</span>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">🎯 Auto-Fit</span>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={onSelect}
    >
      <div className="aspect-[3/4] overflow-hidden">
        <img src={imageUrl || "/placeholder.svg"} alt={material.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm text-gray-900 truncate">{material.name}</h3>
        <p className="text-xs text-gray-600 mt-1 line-clamp-2">{material.description}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-medium text-blue-600">${material.basePrice}</span>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">🎯</span>
        </div>
      </div>
    </motion.div>
  )
}

export default MaterialSelector
