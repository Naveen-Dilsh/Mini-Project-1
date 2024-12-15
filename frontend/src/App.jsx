import { Routes,Route, Navigate } from "react-router-dom"
import Homepage from "./pages/Homepage"
import SignupPage from "./pages/Signup"
import LoginPage from "./pages/login"
import Navbar from "./components/Navbar"
import { Toaster } from "react-hot-toast"
import { useUserStore } from "./stores/useUserStore"
import { useEffect } from "react"


function App() {
  const {user, checkAuth} = useUserStore();
  useEffect(() => {
		checkAuth();
	}, [checkAuth]);

  useEffect(() => {
		if (!user) return;
	}, [user]);

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/signup" element={!user ?<SignupPage/>:<Navigate to ="/"/>}/>
        <Route path="/login" element={!user ?<LoginPage/>:<Navigate to ="/"/>}/>
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
