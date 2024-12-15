import {create} from "zustand"
import {toast} from "react-hot-toast"
import axios from "../lib/axios"

export const useUserStore = create((set, get)=>({
    user:null,
    loading:false,

    signup:async({name,email,password})=>{
        set({loading:true})
        try {
            const res = await axios.post("/auth/signup",{name,email,password})
            set({user:res.data,loading:false})
            toast.success("User Register successfully");
        } catch (error) {
            set({loading:false})
            toast.error(error.response.data.message || "An error occured")
        }
    },

    login:async ({email,password})=>{
        set({loading:true})
        try {
            const res = await axios.post("/auth/login",{email,password})
            set({user:res.data,loading:false})
            toast.success("Login Successfully")
        } catch (error) {
            set({loading:false})
            toast.error(error.response.data.message || "An error occured")
        }
    },
    checkAuth: async () => {
		try {
			const response = await axios.get("/auth/profile");
			set({ user: response.data}); 
            toast.success("Fetch success");
		} catch (error) {
			console.log(error.message);
			set({user: null });
            toast.error("Error fetch");
		}
	},
}))