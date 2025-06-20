import { create } from "zustand"
import axios from "../lib/axios"
import toast from "react-hot-toast"

export const useMaterialStore = create((set, get) => ({
  materials: [],
  selectedMaterial: null,
  loading: false,
  currentClothing: {
    shirt: null,
    trousers: null,
    jacket: null,
    longSleeves: null,
  },

  setSelectedMaterial: (material) => set({ selectedMaterial: material }),

  setCurrentClothing: (clothingType, material) =>
    set((state) => ({
      currentClothing: {
        ...state.currentClothing,
        [clothingType]: material,
      },
    })),

  // NEW: Update material positioning with pose support
  updateMaterialPositioning: async (materialId, clothingType, pose = "front", positioning) => {
    set({ loading: true })
    try {
      const response = await axios.put(`/materials/${materialId}/positioning`, {
        clothingType,
        pose,
        positioning,
      })

      // Update local state
      set((state) => ({
        materials: state.materials.map((material) =>
          material._id === materialId
            ? {
                ...material,
                positioning: {
                  ...material.positioning,
                  [clothingType]: {
                    ...material.positioning?.[clothingType],
                    [pose]: positioning,
                  },
                },
              }
            : material,
        ),
        currentClothing: {
          ...state.currentClothing,
          [clothingType]:
            state.currentClothing[clothingType]?._id === materialId
              ? {
                  ...state.currentClothing[clothingType],
                  positioning: {
                    ...state.currentClothing[clothingType].positioning,
                    [clothingType]: {
                      ...state.currentClothing[clothingType].positioning?.[clothingType],
                      [pose]: positioning,
                    },
                  },
                }
              : state.currentClothing[clothingType],
        },
        loading: false,
      }))

      toast.success("Position saved successfully!")
    } catch (error) {
      set({ loading: false })
      toast.error(error.response?.data?.message || "Failed to save position")
      throw error
    }
  },

  createMaterial: async (materialData) => {
    set({ loading: true })
    try {
      const response = await axios.post("/materials", materialData)
      set((state) => ({
        materials: [response.data.material, ...state.materials],
        loading: false,
      }))
      toast.success("Material created successfully!")
      return response.data.material
    } catch (error) {
      set({ loading: false })
      toast.error(error.response?.data?.message || "Failed to create material")
      throw error
    }
  },

  fetchMaterials: async (category = null) => {
    set({ loading: true })
    try {
      const params = category ? `?category=${category}` : ""
      const response = await axios.get(`/materials${params}`)
      set({
        materials: response.data.materials,
        loading: false,
      })
    } catch (error) {
      set({ loading: false })
      toast.error(error.response?.data?.message || "Failed to fetch materials")
    }
  },

  updateMaterial: async (id, materialData) => {
    set({ loading: true })
    try {
      const response = await axios.put(`/materials/${id}`, materialData)
      set((state) => ({
        materials: state.materials.map((material) => (material._id === id ? response.data.material : material)),
        loading: false,
      }))
      toast.success("Material updated successfully!")
      return response.data.material
    } catch (error) {
      set({ loading: false })
      toast.error(error.response?.data?.message || "Failed to update material")
      throw error
    }
  },

  deleteMaterial: async (id) => {
    set({ loading: true })
    try {
      await axios.delete(`/materials/${id}`)
      set((state) => ({
        materials: state.materials.filter((material) => material._id !== id),
        loading: false,
      }))
      toast.success("Material deleted successfully!")
    } catch (error) {
      set({ loading: false })
      toast.error(error.response?.data?.message || "Failed to delete material")
    }
  },
}))
