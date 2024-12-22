import {create} from "zustand"
import axios from "../lib/axios"
import toast from "react-hot-toast"

export const useProductStore = create((set,get)=>({
    products:[],
    loading:false,

    setProducts:(products)=>set({products}),

    createProducts: async (productData) => {
        set({ loading: true });
        try {
            // Convert FileList to base64 strings if needed
            const processedData = { ...productData };
            if (productData.images && productData.images.length > 0) {
                processedData.images = productData.images; // Already processed in CreateProduct component
            }

            const res = await axios.post("/products", processedData);
            set((prevState) => ({
                products: [...prevState.products, res.data],
                loading: false
            }));
            toast.success("Item Created Successfully");
        } catch (error) {
            toast.error(error.response?.data?.error || "Item Create failed");
            set({ loading: false });
        }
    },

    fetchAllProducts: async()=>{
        set({loading:true})
        try {
            const response = await axios.get("/products")
            set({products:response.data.products,loading:false});
        } catch (error) {
            set({loading:false});
            toast.error(error?.response?.data?.error ||"Failed to fetch Products");
        }
    },

    toggleFeaturedProducts : async (productId)=>{
        set({loading:true});
        try {
            const response = await axios.patch(`/products/${productId}`)
            console.log(response);
            console.log(response.data);
            set((prevProducts)=>({
                products:prevProducts.products.map((product) =>
                    product._id ===productId?{...product,isFeatured:response.data.updateProduct.isFeatured}:product
                ),
                loading:false,
            }));
            toast.success("Product featured successful")
        } catch (error) {
            set({loading:false})
            toast.error(error.response.data.error || "Failed to update Product");
        }
    },

    fetchFeaturedProducts:async ()=>{
        set({loading:true})
        try {
            const response = await axios.get("/products/featured");
            set({products : response.data.featuredProducts,loading:false});
            toast.success("Featured products fetch Successfull");
        } catch (error) {
            set({loading:false});
            toast.error(error.response.data.error || "Failed to fetch Featured products")
        }
    },

    fetchFeaturedProductsByCategory : async(category) =>{
        set({loading:true})
        try {
            const response= await axios.get(`/products/category/${category}`)
            console.log(response.data)
            set({products:response.data,loading:false})
            toast.success("Fetch successful");
        } catch (error) {
            set({loading:false})
            toast.error(error.response.data.error || "Failed to fetch products");
        }
    },

    deleteProduct: async (Id) => {
        set({ loading: true });
        try {
            const response = await axios.delete(`/products/${Id}`);
            set((prevProducts) => ({
                products: prevProducts.products.filter((product) => product._id !== Id),
                loading: false
            }));
            toast.success("Product deleted Successfully");
        } catch (error) {
            set({ loading: false });
            toast.error(error.response?.data?.error || "Failed to delete product");
        }
    }
}))