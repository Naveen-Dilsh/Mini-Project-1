//one component
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProductGallery = ({ images = [], name = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (!images.length) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds 
    
    return () => clearInterval(interval);
  }, [images.length]);
  
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  if (!images.length) return null;

  return (
    <div className="space-y-4">
      <div className="relative aspect-square bg-white rounded-lg overflow-hidden group">
        <img 
          src={images[currentIndex]}
          alt={`${name} - View ${currentIndex + 1}`}
          className="w-full h-full object-contain transition-transform duration-500"
        />
        
        {/* Navigation Arrows */}
        <button 
          onClick={handlePrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        
        <button 
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>
        
        {/* Progress Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-gray-800 w-4' 
                  : 'bg-gray-400'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, i) => (
          <button
            key={i}
            onClick={() => handleThumbnailClick(i)}
            className={`aspect-square bg-white rounded-lg overflow-hidden ${
              i === currentIndex ? 'ring-2 ring-gray-900' : ''
            }`}
          >
            <img
              src={image}
              alt={`${name} thumbnail ${i + 1}`}
              className="w-full h-full object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;

//lib
import axios from "axios"

const axiosInstance = axios.create({
    baseURL:import.meta.mode === "development" ? "http://localhost:5000/api":"/api",
    withCredentials:true
});

export default axiosInstance;

//one page
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Leaf, ShoppingBag } from 'lucide-react';
import CollectionItem from '../components/CollectionItem';
import { useProductStore } from '../stores/useProductStore';
import LoadingSpinner from '../components/LoadingSpinner';


const categories = [
  { 
    href: "/Phone", 
    name: "Jeans", 
    imageUrl: "/bags.jpg",
    description: "Sustainable denim for conscious fashion"
  },
  { 
    href: "/LapTop", 
    name: "T-shirts", 
    imageUrl: "/suits.jpg",
    description: "Eco-friendly comfort wear"
  },
  { 
    href: "/Watch", 
    name: "Shoes", 
    imageUrl: "/tshirts.jpg",
    description: "Walk with purpose, tread lightly"
  },
  { 
    href: "/Monitor", 
    name: "Glasses", 
    imageUrl: "/shoes.jpg",
    description: "Style meets sustainability"
  },
  { 
    href: "/Phone", 
    name: "Jeans", 
    imageUrl: "/E-commerce.jpg",
    description: "Sustainable denim for conscious fashion"
  },
  { 
    href: "/LapTop", 
    name: "T-shirts", 
    imageUrl: "/E-commerce.jpg",
    description: "Eco-friendly comfort wear"
  },
  { 
    href: "/Watch", 
    name: "Shoes", 
    imageUrl: "/E-commerce.jpg",
    description: "Walk with purpose, tread lightly"
  },
];

const CollectionsPage = () => {
   const { loading } = useProductStore();
  if(loading) return <LoadingSpinner/>
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='relative min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 text-gray-900 overflow-hidden'
    >
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className='text-center mb-16'
        >
          <div className='flex justify-center items-center mb-4'>
            <Leaf className='text-emerald-500 mr-3' size={40} />
            <h1 className='text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500'>
              Sustainable Collections
            </h1>
          </div>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto flex items-center justify-center'>
            <ShoppingBag className='mr-3 text-blue-500' size={24} />
            Discover Fashion That Cares for Our Planet
            <Sparkles className='ml-3 text-emerald-500' size={24} />
          </p>
        </motion.div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {categories.map((category, index) => (
            <CollectionItem
              key={category.name} 
              category={category} 
              index={index} 
            />
          ))}
        </div>

       
      </div>
    </motion.div>
  );
};

export default CollectionsPage;


//stores (use Zustand for state management)
import {create} from "zustand"
import axios from "../lib/axios"
import toast from "react-hot-toast"

export const useProductStore = create((set,get)=>({
    products:[],
    loading:false,
    recommendedItems: [],

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
            toast.success("Featured products fetch Successful");
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
    },

    fetchRecommendedItems: async (filters = {}) => {
        set({ loading: true });
        try {
            // Construct query string from filters
            const queryParams = new URLSearchParams(filters).toString();
            const url = `/products/recommended-items${queryParams ? `?${queryParams}` : ''}`;
            
            const response = await axios.get(url);
            
            if (response.data.success) {
                set({
                    recommendedItems: response.data.recommendedItems,
                    loading: false
                });
                return response.data.recommendedItems;
            }
        } catch (error) {
            set({ loading: false });
            toast.error(error.response?.data?.error || "Failed to fetch recommended items");
            return [];
        }
    }
}))

//APP.jsx
import { Routes,Route, Navigate } from "react-router-dom"
import Homepage from "./pages/Homepage"
import SignupPage from "./pages/Signup"
import LoginPage from "./pages/login"
import Navbar from "./components/Navbar"
import { Toaster } from "react-hot-toast"
import { useUserStore } from "./stores/useUserStore"
import { useProductStore } from "./stores/useProductStore"
import { useEffect } from "react"
import LoadingSpinner from "./components/LoadingSpinner"
import AdminPage from "./pages/AdminPage"
import CollectionsPage from "./pages/CollectionsPage"
import CategoryPage from "./pages/CategoryPage"
import CartPage from "./pages/CartPage"
import { useCartStore } from "./stores/useCartStore"
import ProductDetails from "./components/ProductDetailes"
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage"
import PurchaseCancelPage from "./pages/PurchaseCancelPage"
import Guarantee from "./components/Gurantee"
import CollectionPage2 from "./pages/CollectionPage2"
import Footer from "./components/Footer"
import SizeGuidePage from "./pages/SizeGuidePage"
import ContactUsPage from "./pages/ContactUs"
import UserPage from "./pages/UserPage"



function App() {
  const {user, checkAuth ,checkingAuth} = useUserStore();
  const {getCartItems} = useCartStore();
  const {fetchRecommendedItems} = useProductStore();
  useEffect(() => {
        checkAuth();
    fetchRecommendedItems();
    }, [checkAuth,fetchRecommendedItems]);

  useEffect(() => {
        if (!user) return;
    getCartItems();
    }, [getCartItems,user]);
 

  if(checkingAuth) return <LoadingSpinner/>

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        {/* <Route path="/signup" element={!user ?<SignupPage/>:<Navigate to ="/"/>}/> */}
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/login" element={!user ?<LoginPage/>:<Navigate to="/"/>}/>
        <Route path="/size-guide" element={<SizeGuidePage/>}/>
        <Route path="/contact" element={<ContactUsPage/>}/>
        <Route path="/collection" element={<CollectionPage2/>}/>
        <Route path="/category/:category" element={<CategoryPage/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/product-details" element={<ProductDetails/>}/>
        <Route path="/purchase-success" element={<PurchaseSuccessPage/>}/>
        <Route path="/purchase-cancel" element={<PurchaseCancelPage/>}/>

        <Route path="/account" element={<UserPage/>}/>

        <Route path="/guarantee" element={<Guarantee/>}/> 
        {/* Change this line in your Routes */}
        <Route path="/product/:id" element={<ProductDetails/>}/>
        <Route
                        path='/secret-dashboard'
                        element={user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />}
                    />
      </Routes>
      <Footer/>
      <Toaster/>
    </>
  )
}

export default App


//main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
