import './navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { CgProfile } from "react-icons/cg"
import { MdStorefront } from "react-icons/md"
import { useState, useEffect, useRef } from 'react'
import { CiSearch } from "react-icons/ci";
import { BsCart3 } from "react-icons/bs";

import axiosInstance from '../api/axiosInstance'

export default function Navbar({ auth, setauth }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [searching, setSearching] = useState(false)
  const searchRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    axiosInstance.get('/api/profile/')
      .then((res) => {
        setData(res.data)

        localStorage.setItem(
          "deliveryLocation",
          JSON.stringify({
            city: res.data.city,
            pincode: res.data.pincode
          })
        )
      })
      .catch(() => {
        setauth({ isLoggedIn: false, username: null })
      })
      .finally(() => setLoading(false))
  }, [setauth])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Search products
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      setSearching(true)
      const timer = setTimeout(() => {
        axiosInstance.get(`/products/?search=${searchQuery}`)
          .then((res) => {
            setSearchResults(res.data)
            setShowDropdown(true)
          })
          .catch((err) => {
            console.error('Search failed:', err)
            setSearchResults([])
          })
          .finally(() => setSearching(false))
      }, 300) // Debounce search

      return () => clearTimeout(timer)
    } else {
      setSearchResults([])
      setShowDropdown(false)
    }
  }, [searchQuery])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleProductClick = (productId) => {
    setShowDropdown(false)
    setSearchQuery('')
    navigate(`/product/${productId}`)
  }

  if (loading) return <p>Loading...</p>

  const handleLogout = async () => {
    try {
      const refresh = localStorage.getItem("refresh")
      if (refresh) {
        await axiosInstance.post('/api/logout/', { refresh })
      }
    } catch (err) {
      console.error("Logout failed:", err.response?.data || err.message)
    } finally {
      localStorage.removeItem("access")
      localStorage.removeItem("refresh")
      setauth({ isLoggedIn: false, username: null })
      navigate('/login')
    }
  }

  return (
    <header className="header">
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="logo">
          <span className="logo-it">green</span>
          <span className="logo-blink">Grocers</span>
        </div>

        <div className="delivery-info">
          <div className="delivery-time">
            {data ? `Delivering to ${data.city}` : "Select Delivery location"}
          </div>
          <div className="delivery-location">
            {data && `Pincode : ${data.pincode}`}
          </div>
        </div>
      </div>

      <div className="search-box" ref={searchRef}>
        <span className="search-icon"><CiSearch /></span>
        <input
          type="text"
          className="search-input"
          placeholder='Search what you like'
          value={searchQuery}
          onChange={handleSearchChange}
        />
        
        {showDropdown && (
          <div className="search-dropdown">
            {searching ? (
              <div className="search-loading">Searching...</div>
            ) : searchResults.length > 0 ? (
              searchResults.map((product) => (
                <div
                  key={product.id}
                  className="search-item"
                  onClick={() => handleProductClick(product.id)}
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="search-item-image"
                  />
                  <div className="search-item-details">
                    <div className="search-item-name">{product.name}</div>
                    <div className="search-item-category">{product.category}</div>
                    <div className="search-item-price">₹{product.price_per_unit}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="search-no-results">No products found</div>
            )}
          </div>
        )}
      </div>

      <div className="header-actions">
        <Link to="/seller">
          <div className="seller-section">
            <MdStorefront className="seller-icon" />
            <span className="seller-text">Become a Seller</span>
          </div>
        </Link>

        {!auth.isLoggedIn ? (
          <>
            <Link to="/login"><button className="login-btn">Login</button></Link>
            <Link to="/register"><button className="register-btn">Register</button></Link>
            <Link to="/cart"><button className="cart-btn"><BsCart3 /> My Cart</button></Link>
          </>
        ) : (
          <>
            <Link to="/cart"><button className="cart-btn"><BsCart3 /> My Cart</button></Link>

            <Link to="/profile">
              <div className="profile-section">
                <CgProfile className="profile-icon" />
                <span className="profile-name">{auth.username}</span>
              </div>
            </Link>

            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  )
}