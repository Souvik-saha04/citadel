import './profile.css'
import { CgProfile } from "react-icons/cg"
import { MdEdit } from "react-icons/md"
import { IoMdCart } from "react-icons/io"
import { MdAccountCircle, MdLocationOn, MdCreditCard, MdLogout } from "react-icons/md"
import { FaGift, FaStar, FaBell, FaHeart } from "react-icons/fa"
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance'

export default function Profile() {
  const [profileData, setProfileData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('profile')
  const navigate = useNavigate()

  useEffect(() => {
    axiosInstance.get('/api/profile/')
      .then((res) => setProfileData(res.data))
      .catch(() => navigate('/login'))
      .finally(() => setLoading(false))
  }, [navigate])

  const handleLogout = async () => {
    try {
      const refresh = localStorage.getItem("refresh")
      if (refresh) await axiosInstance.post('/api/logout/', { refresh })
    } catch (err) {
      console.error("Logout failed:", err)
    } finally {
      localStorage.removeItem("access")
      localStorage.removeItem("refresh")
      navigate('/login')
    }
  }

  if (loading) return <p>Loading...</p>
  if (!profileData) return <p>No profile data found</p>

  return (
    <div className="profile-page">
      {/* ── SIDEBAR ── */}
      <aside className="profile-sidebar">
        {/* User identity */}
        <div className="sidebar-user">
          <div className="sidebar-avatar">
            <CgProfile className="sidebar-avatar-icon" />
          </div>
          <div>
            <p className="sidebar-hello">Hello,</p>
            <p className="sidebar-username">{profileData.first_name} {profileData.last_name}</p>
          </div>
        </div>

        {/* MY ORDERS */}
        <div className="sidebar-section">
          <div
            className={`sidebar-section-header ${activeSection === 'orders' ? 'active' : ''}`}
            onClick={() => navigate('/orders')}
          >
            <IoMdCart className="sidebar-section-icon" />
            <span>MY ORDERS</span>
          </div>
        </div>

        {/* ACCOUNT SETTINGS */}
        <div className="sidebar-section">
          <div className="sidebar-section-header non-clickable">
            <MdAccountCircle className="sidebar-section-icon" />
            <span>ACCOUNT SETTINGS</span>
          </div>
          <ul className="sidebar-links">
            <li
              className={activeSection === 'profile' ? 'active' : ''}
              onClick={() => setActiveSection('profile')}
            >Profile Information</li>
            <li
              className={activeSection === 'addresses' ? 'active' : ''}
              onClick={() => setActiveSection('addresses')}
            >Manage Addresses</li>
          </ul>
        </div>

        {/* MY STUFF */}
        <div className="sidebar-section">
          <div className="sidebar-section-header non-clickable">
            <FaGift className="sidebar-section-icon" />
            <span>MY STUFF</span>
          </div>
          <ul className="sidebar-links">
            <li onClick={() => navigate('/coupons')}><FaGift size={13}/>&nbsp; My Coupons</li>
            <li onClick={() => navigate('/reviews')}><FaStar size={13}/>&nbsp; My Reviews & Ratings</li>
            <li onClick={() => navigate('/notifications')}><FaBell size={13}/>&nbsp; All Notifications</li>
            <li onClick={() => navigate('/wishlist')}><FaHeart size={13}/>&nbsp; My Wishlist</li>
          </ul>
        </div>

        {/* LOGOUT */}
        <div className="sidebar-section">
          <div className="sidebar-section-header sidebar-logout" onClick={handleLogout}>
            <MdLogout className="sidebar-section-icon" />
            <span>Logout</span>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="profile-main">
        {activeSection === 'profile' && (
          <div className="profile-card">
            {/* Personal Information */}
            <section className="profile-section-block">
              <div className="profile-section-title-row">
                <h2 className="profile-section-title">Personal Information</h2>
                <button className="profile-inline-edit-btn"><MdEdit /> Edit</button>
              </div>
              <div className="profile-row">
                <div className="profile-field">
                  <input type="text" className="profile-input" defaultValue={profileData.first_name} placeholder="First Name" />
                </div>
                <div className="profile-field">
                  <input type="text" className="profile-input" defaultValue={profileData.last_name} placeholder="Last Name" />
                </div>
              </div>
              <div className="profile-gender-row">
                <span className="profile-label">Your Gender</span>
                <label className="profile-radio-label">
                  <input type="radio" name="gender" value="male" defaultChecked /> Male
                </label>
                <label className="profile-radio-label">
                  <input type="radio" name="gender" value="female" /> Female
                </label>
              </div>
            </section>

            <div className="profile-divider" />

            {/* Email Address */}
            <section className="profile-section-block">
              <div className="profile-section-title-row">
                <h2 className="profile-section-title">Email Address</h2>
                <button className="profile-inline-edit-btn"><MdEdit /> Edit</button>
              </div>
              <div className="profile-row">
                <div className="profile-field">
                  <input type="email" className="profile-input" value={profileData.email} readOnly />
                </div>
              </div>
            </section>

            <div className="profile-divider" />

            {/* Mobile Number */}
            <section className="profile-section-block">
              <div className="profile-section-title-row">
                <h2 className="profile-section-title">Mobile Number</h2>
                <button className="profile-inline-edit-btn"><MdEdit /> Edit</button>
              </div>
              <div className="profile-row">
                <div className="profile-field">
                  <input type="tel" className="profile-input" defaultValue={profileData.phone} placeholder="Phone Number" />
                </div>
              </div>
            </section>

            <div className="profile-divider" />

            {/* Delivery Address */}
            <section className="profile-section-block">
              <div className="profile-section-title-row">
                <h2 className="profile-section-title">Delivery Address</h2>
              </div>
              <div className="profile-row">
                <div className="profile-field" style={{ flex: 2 }}>
                  <textarea className="profile-textarea" defaultValue={profileData.address} placeholder="Full Address" />
                </div>
              </div>
              <div className="profile-row">
                <div className="profile-field">
                  <input type="text" className="profile-input" defaultValue={profileData.city} placeholder="City" />
                </div>
                <div className="profile-field">
                  <input type="text" className="profile-input" defaultValue={profileData.pincode} placeholder="Pincode" />
                </div>
              </div>
            </section>

            <div className="profile-actions">
              <button className="profile-save-btn">Save Changes</button>
              <button className="profile-cancel-btn">Cancel</button>
            </div>
          </div>
        )}

        {activeSection === 'addresses' && (
          <div className="profile-card">
            <h2 className="profile-section-title" style={{ marginBottom: 24 }}>Manage Addresses</h2>
            <p style={{ color: '#888' }}>Your saved addresses will appear here.</p>
          </div>
        )}
      </main>
    </div>
  )
}