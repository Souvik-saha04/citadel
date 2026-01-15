import Homepage from "./pages/homepage"
import Register from "./forms/Registerform"
import Login from "./forms/loginform"
import Cart from "./navigation/cart"
import Profile from "./navigation/profile"
import Seller from "./navigation/seller"
import { Route,Routes } from 'react-router-dom'
import { useState } from "react"
function App() {
  const [auth,setauth]=useState({isLoggedIn:false,username:""});
  return (
      <Routes>
        <Route path="/" element={<Homepage auth={auth}/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login setauth={setauth}/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/seller" element={<Seller/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
      </Routes>
  )
}

export default App
