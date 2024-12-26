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
        <Route path="/collection" element={<CollectionPage2/>}/>
        <Route path="/category/:category" element={<CategoryPage/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/product-details" element={<ProductDetails/>}/>
        <Route path="/purchase-success" element={<PurchaseSuccessPage/>}/>
        <Route path="/purchase-cancel" element={<PurchaseCancelPage/>}/>

        <Route path="/guarantee" element={<Guarantee/>}/> 
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
