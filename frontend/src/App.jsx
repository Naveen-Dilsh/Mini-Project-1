import { Routes,Route, Navigate } from "react-router-dom"
import Homepage from "./pages/Homepage"
import SignupPage from "./pages/Signup"
import LoginPage from "./pages/login"
import Navbar from "./components/Navbar"
import { Toaster } from "react-hot-toast"
import { useUserStore } from "./stores/useUserStore"
import { useEffect } from "react"
import LoadingSpinner from "./components/LoadingSpinner"
import AdminPage from "./pages/AdminPage"
import CollectionsPage from "./pages/CollectionsPage"
import CategoryPage from "./pages/CategoryPage"
import CartPage from "./pages/CartPage"
import { useCartStore } from "./stores/useCartStore"
import ProductDetails from "./components/ProductDetailes"



function App() {
  const {user, checkAuth ,checkingAuth} = useUserStore();
  const {getCartItems} = useCartStore();
  useEffect(() => {
		checkAuth();
	}, [checkAuth]);

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
        <Route path="/collection" element={<CollectionsPage/>}/>
        <Route path="/category/:category" element={<CategoryPage/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/product-details" element={<ProductDetails/>}/>

        <Route
						path='/secret-dashboard'
						element={user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />}
					/>
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
