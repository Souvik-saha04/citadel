import './navbar.css'
import { Link } from 'react-router-dom'
import { CgProfile } from "react-icons/cg"
import { MdStorefront } from "react-icons/md"

export default function Navbar({auth})
{
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