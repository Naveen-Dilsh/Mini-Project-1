import { Routes,Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import SignupPage from "./pages/Signup"
import LoginPage from "./pages/login"
import Navbar from "./components/Navbar"
import { Toaster } from "react-hot-toast"


function App() {

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
