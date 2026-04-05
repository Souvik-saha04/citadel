import Homepage from "./pages/homepage"
import Register from "./forms/Registerform"
import Login from "./forms/loginform"
import Cart from "./navigation/cart"
import Profile from "./navigation/profile"
import ProductView from './products/singleproduct'
import Seller from "./navigation/seller"
import OrderConfirmation from "./order_confirm/confirm_page"
import ProductListing from './products/category_prod_sec'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useState, useEffect } from "react"

function App() {

  const [auth, setauth] = useState({
    isLoggedIn: false,
    username: ""
  })

  const [products, setProducts] = useState([])

  useEffect(() => {
    const access = localStorage.getItem("access")
    setauth({
      isLoggedIn: !!access,
      username: access ? "user" : ""
    })
  }, [])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products/get_products/`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err))
  }, [])

  const RequireAuth = ({ children }) => {
  const access = localStorage.getItem("access");
  return access ? children : <Navigate to="/login" />;
};

  return (
    <Routes>

      <Route
        path="/"
        element={<Homepage auth={auth} setauth={setauth} products={products} />}
      />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login setauth={setauth} />} />
      <Route path="/products" element={<ProductListing products={products} />} />
      <Route path="/product/:id" element={<ProductView />} />

      <Route
        path="/profile"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
      <Route
        path="/cart"
        element={
          <RequireAuth>
            <Cart />
          </RequireAuth>
        }
      />
      <Route
        path="/seller"
        element={
          <RequireAuth>
            <Seller />
          </RequireAuth>
        }
      />
      <Route
      path="/order_confirmed"
      element={
        <RequireAuth>
          <OrderConfirmation/>
        </RequireAuth>
      }
      />

    </Routes>
  )
}

export default App
