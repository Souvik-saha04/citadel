import Homepage from "./pages/homepage"
import Register from "./forms/Registerform"
import Login from "./forms/loginform"
import Cart from "./navigation/cart"
import Profile from "./navigation/profile"
import ProductView from './products/singleproduct'
import Seller from "./navigation/seller"
import { Route,Routes } from 'react-router-dom'
import { useState,useEffect } from "react"
function App() {
  const [auth,setauth]=useState({isLoggedIn:false,username:""});
  useEffect(() => {
  fetch("http://localhost:8000/api/check_auth/", {
    credentials: "include",
  })
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(data => {
      setauth({
        isLoggedIn: true,
        username: data.username,
      });
    })
    .catch(() => {
      setauth({
        isLoggedIn: false,
        username: "",
      });
    });
}, []);

  return (
      <Routes>
        <Route path="/" element={<Homepage auth={auth} setauth={setauth}/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login setauth={setauth}/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/seller" element={<Seller/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route> 
        <Route path="/product/:id" element={<ProductView/>}></Route>
      </Routes>
  )
}

export default App
