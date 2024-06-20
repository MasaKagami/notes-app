import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute"
// import Logout from "./pages/Logout"

function Logout(){
  localStorage.clear()
  return <Navigate to= "/login" />
}

function RegisterAndLogout(){
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path = "/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        /> {/* home route. can't access it without an valid access token */}
        
        <Route path = "/login" element={<Login />}/>
        <Route path = "/logout" element={<Logout />}/>
        <Route path = "/register" element={<Register />}/>
        <Route path = "*" element={<NotFound />}/> {/* Not Found Page*/}
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
