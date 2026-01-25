import './navbar.css'
import { Link } from 'react-router-dom'
import { CgProfile } from "react-icons/cg"
import { MdStorefront } from "react-icons/md"
import axios from 'axios'

export default function Navbar({auth,setauth})
{
    function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(name + "=")) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const handlelogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/logout/",
        {},
        {
          withCredentials: true,
          headers: {
            "X-CSRFToken": getCookie("csrftoken"),
          },
        }
      );
      setauth({
        isLoggedIn: false,
        username: null,
      });
      alert("logged OUT")
    } catch (err) {
      console.error("Logout failed:", err.response?.data || err.message);
    }

    }
    return(
        <header className="header">
            <div style={{display: "flex" , alignItems: "center"}}>
                <div className="logo">
                    <span className="logo-it">green</span><span className="logo-blink">Grocers</span>
                </div>
                <div className="delivery-info">
                    <div className="delivery-time">Delivery in 8 minutes</div>
                    <div className="delivery-location">BG2, Pocket B, South City I, Sect... ▾</div>
                </div>
            </div>
            <div className="search-box">
                <span className="search-icon">🔍</span>
                <input type="text" className="search-input" placeholder="Search &quot;curd&quot;"/>
            </div>
            <div className="header-actions">
                <Link to="/seller"><div className="seller-section">
                    <MdStorefront className="seller-icon" />
                    <span className="seller-text">Become a Seller</span>
                </div></Link>
                {(!auth.isLoggedIn)?
                <>
                    <Link to="/login"><button className="login-btn">Login </button></Link>
                    <Link to="/register"><button className="register-btn">Register</button></Link>
                    <Link to='/cart'><button className="cart-btn">
                    🛒 My Cart
                    </button></Link>
                    <Link to="/profile"><div className="profile-section">
                    <CgProfile className="profile-icon"/>
                </div></Link>
                </>:
                <>
                    <Link to='/cart'><button className="cart-btn">
                    🛒 My Cart
                    </button></Link>
                    <Link to="/profile"><div className="profile-section">
                    <CgProfile className="profile-icon"/>
                    <span className="profile-name">{auth.username}</span>
                    </div></Link>
                    <button onClick={handlelogout} className='logout-button'>logout</button>
                </>
                }
                {/* <Link to='/cart'><button className="cart-btn">
                    🛒 My Cart
                </button></Link>
                <Link to="/profile"><div className="profile-section">
                    <CgProfile className="profile-icon"/>
                    {auth.isLoggedIn && <span className="profile-name">{auth.username}</span>}
                </div></Link> */}
            </div>
        </header>
    );
}