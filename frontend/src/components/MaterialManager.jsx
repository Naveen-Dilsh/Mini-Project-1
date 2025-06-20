"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useMaterialStore } from "../stores/useMaterialStroe"
import { Plus, Edit, Trash2, Upload, X } from "lucide-react"

const MaterialManager = () => {
  const { materials, fetchMaterials, createMaterial, updateMaterial, deleteMaterial, loading } = useMaterialStore()
  const [showForm, setShowForm] = useState(false)
  const [editingMaterial, setEditingMaterial] = useState(null)

  useEffect(() => {
    fetchMaterials()
  }, [fetchMaterials])

  const handleEdit = (material) => {
    setEditingMaterial(material)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this material?")) {
      await deleteMaterial(id)
    }
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingMaterial(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Material Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Material</span>
        </button>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {materials.map((material) => (
          <MaterialCard
            key={material._id}
            material={material}
            onEdit={() => handleEdit(material)}
            onDelete={() => handleDelete(material._id)}
          />
        ))}
      </div>

      {/* Material Form Modal */}
      {showForm && (
        <MaterialForm
          material={editingMaterial}
          onClose={handleCloseForm}
          onSubmit={editingMaterial ? updateMaterial : createMaterial}
        />
      )}
    </div>
  )
}

const MaterialCard = ({ material, onEdit, onDelete }) => {
  const primaryImage =
    material.images?.shirt ||
    material.images?.trousers ||
    material.cloudAssets?.shirt ||
    material.cloudAssets?.trousers ||
    "/placeholder.svg?height=200&width=150"

  return (
    <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-[3/4] overflow-hidden">
        <img src={primaryImage || "/placeholder.svg"} alt={material.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900">{material.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{material.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-medium text-blue-600">${material.basePrice}</span>
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded capitalize">{material.category}</span>
        </div>
        <div className="flex space-x-2 mt-4">
          <button
            onClick={onEdit}
            className="flex-1 flex items-center justify-center space-x-1 bg-gray-100 text-gray-700 px-3 py-2 rounded hover:bg-gray-200 transition-colors"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={onDelete}
            className="flex-1 flex items-center justify-center space-x-1 bg-red-100 text-red-700 px-3 py-2 rounded hover:bg-red-200 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

const MaterialForm = ({ material, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: material?.name || "",
    description: material?.description || "",
    category: material?.category || "shirt",
    basePrice: material?.basePrice || 0,
    properties: {
      texture: material?.properties?.texture || "smooth",
      pattern: material?.properties?.pattern || "solid",
      weight: material?.properties?.weight || "medium",
      stretch: material?.properties?.stretch || false,
    },
    images: material?.images || {
      shirt: "",
      trousers: "",
      jacket: "",
      longSleeves: "",
    },
  })

  const handleImageUpload = (clothingType, file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setFormData((prev) => ({
        ...prev,
        images: {
          ...prev.images,
          [clothingType]: e.target.result,
        },
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Ensure images object exists
      const submitData = {
        ...formData,
        images: formData.images || {},
      }

      if (material) {
        await onSubmit(material._id, submitData)
      } else {
        await onSubmit(submitData)
      }
      onClose()
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{material ? "Edit Material" : "Add New Material"}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="shirt">Shirt</option>
                  <option value="trousers">Trousers</option>
                  <option value="jacket">Jacket</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Base Price ($)</label>
              <input
                type="number"
                value={formData.basePrice}
                onChange={(e) => setFormData({ ...formData, basePrice: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
                step="0.01"
                required
              />
            </div>

            {/* Properties */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Texture</label>
                <select
                  value={formData.properties.texture}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      properties: { ...formData.properties, texture: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="smooth">Smooth</option>
                  <option value="textured">Textured</option>
                  <option value="rough">Rough</option>
                  <option value="silky">Silky</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pattern</label>
                <select
                  value={formData.properties.pattern}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      properties: { ...formData.properties, pattern: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="solid">Solid</option>
                  <option value="striped">Striped</option>
                  <option value="checkered">Checkered</option>
                  <option value="dotted">Dotted</option>
                  <option value="floral">Floral</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
                <select
                  value={formData.properties.weight}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      properties: { ...formData.properties, weight: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="light">Light</option>
                  <option value="medium">Medium</option>
                  <option value="heavy">Heavy</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="stretch"
                  checked={formData.properties.stretch}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      properties: { ...formData.properties, stretch: e.target.checked },
                    })
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="stretch" className="ml-2 block text-sm text-gray-700">
                  Stretch
                </label>
              </div>
            </div>

            {/* Image Uploads */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Clothing Images</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["shirt", "trousers", "jacket", "longSleeves"].map((clothingType) => (
                  <div key={clothingType} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {clothingType.replace(/([A-Z])/g, " $1")}
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0]
                          if (file) handleImageUpload(clothingType, file)
                        }}
                        className="hidden"
                        id={`upload-${clothingType}`}
                      />
                      <label
                        htmlFor={`upload-${clothingType}`}
                        className="cursor-pointer flex flex-col items-center space-y-2"
                      >
                        <Upload className="w-6 h-6 text-gray-400" />
                        <span className="text-sm text-gray-600">Upload Image</span>
                      </label>
                      {formData.images[clothingType] && (
                        <div className="mt-2">
                          <img
                            src={formData.images[clothingType] || "/placeholder.svg"}
                            alt={clothingType}
                            className="w-full h-20 object-cover rounded"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {material ? "Update Material" : "Create Material"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default MaterialManager
