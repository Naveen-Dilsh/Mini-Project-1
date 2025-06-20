import { create } from "zustand"
import axios from "../lib/axios"
import toast from "react-hot-toast"

export const useSuitDesignStore = create((set, get) => ({
  suitDesigns: [],
  currentDesign: null,
  loading: false,

  // Default design configuration
  defaultDesign: {
    designName: "My Suit Design",
    jacket: {
      material: "wool",
      color: "#1a1a1a",
      style: "single-breasted",
      lapelStyle: "notched",
      buttonCount: 2,
    },
    trousers: {
      material: "wool",
      color: "#1a1a1a",
      style: "straight",
      pleats: false,
      cuffs: false,
    },
    measurements: {
      chest: 40,
      waist: 34,
      shoulder: 18,
      armLength: 25,
      jacketLength: 30,
      trouserWaist: 34,
      trouserLength: 42,
      inseam: 32,
    },
  },

  setCurrentDesign: (design) => set({ currentDesign: design }),

  createSuitDesign: async (designData) => {
    set({ loading: true })
    try {
      const response = await axios.post("/suit-designs", designData)
      set((state) => ({
        suitDesigns: [response.data.suitDesign, ...state.suitDesigns],
        currentDesign: response.data.suitDesign,
        loading: false,
      }))
      toast.success("Suit design saved successfully!")
      return response.data.suitDesign
    } catch (error) {
      set({ loading: false })
      toast.error(error.response?.data?.message || "Failed to save suit design")
      throw error
    }
  },

  getUserSuitDesigns: async () => {
    set({ loading: true })
    try {
      const response = await axios.get("/suit-designs")
      set({
        suitDesigns: response.data.suitDesigns,
        loading: false,
      })
    } catch (error) {
      set({ loading: false })
      toast.error(error.response?.data?.message || "Failed to fetch suit designs")
    }
  },

  getSuitDesignById: async (id) => {
    set({ loading: true })
    try {
      const response = await axios.get(`/suit-designs/${id}`)
      set({
        currentDesign: response.data.suitDesign,
        loading: false,
      })
      return response.data.suitDesign
    } catch (error) {
      set({ loading: false })
      toast.error(error.response?.data?.message || "Failed to fetch suit design")
      throw error
    }
  },

  updateSuitDesign: async (id, designData) => {
    set({ loading: true })
    try {
      const response = await axios.put(`/suit-designs/${id}`, designData)
      set((state) => ({
        suitDesigns: state.suitDesigns.map((design) => (design._id === id ? response.data.suitDesign : design)),
        currentDesign: response.data.suitDesign,
        loading: false,
      }))
      toast.success("Suit design updated successfully!")
      return response.data.suitDesign
    } catch (error) {
      set({ loading: false })
      toast.error(error.response?.data?.message || "Failed to update suit design")
      throw error
    }
  },

  deleteSuitDesign: async (id) => {
    set({ loading: true })
    try {
      await axios.delete(`/suit-designs/${id}`)
      set((state) => ({
        suitDesigns: state.suitDesigns.filter((design) => design._id !== id),
        loading: false,
      }))
      toast.success("Suit design deleted successfully!")
    } catch (error) {
      set({ loading: false })
      toast.error(error.response?.data?.message || "Failed to delete suit design")
    }
  },
}))
