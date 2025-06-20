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
import SuitDesignerPage from "./pages/SuitDesignerPage"
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
import MaterialsPage from "./pages/MaterialPage"
import ClothingDesignerPage from "./pages/ClothingDesignerPage"



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
        <Route path="/size-guide" element={<MaterialsPage/>}/>
        <Route path="/contact" element={<ClothingDesignerPage />}/>
        <Route path="/collection" element={<CollectionPage2/>}/>
        <Route path="/clothing-designer" element={<ClothingDesignerPage />} />
          <Route path="/admin/materials" element={<MaterialsPage/>}/>
        {/* <Route path="/collection" element={<CollectionPage2/>}/> */}
        
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
