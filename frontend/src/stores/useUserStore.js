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
    }
}))