import './profile.css'
import { CgProfile } from "react-icons/cg"
import { MdEdit } from "react-icons/md"
import { useEffect,useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function Profile()
{
    const [profileData,setprofileData]=useState(null);
    const[unauthorized,setunauthorized]=useState(false)
    const[loading,setloading]=useState(true)

        useEffect(() => {
            fetch("http://localhost:8000/api/profile/", {
            credentials: "include"
            })
            .then((res) => {
                if (res.status === 401) {
                setunauthorized(true);
                return null;
                }
                return res.json();
            })
            .then((data) => {
                if (data) {
                setprofileData(data);
                }
            })
            .finally(() => setloading(false));
        }, []
    );
      if (loading) {
        return <p>Loading...</p>;
    }

    if (unauthorized) {
        return <Navigate to="/login" />;
    }

    if (!profileData) {
        return <p>No profile data found</p>;
    }

    return(
        <div className="profile-container">
            <div className="profile-header">
                <h1><span className="profile-title-green">My</span> <span className="profile-title-black">Profile</span></h1>
                <p className="profile-subtitle">View and manage your account information</p>
            </div>
            
            <div className="profile-content">
                <div className="profile-avatar-section">
                    <div className="profile-avatar-box">
                        <CgProfile className="profile-avatar-icon"/>
                    </div>
                    <button className="profile-edit-btn">
                        <MdEdit className="profile-edit-icon"/>
                        Edit Photo
                    </button>
                </div>

                <div className="profile-form-section">
                    <div className="profile-row">
                        <div className="profile-field">
                            <label className="profile-label">Username</label>
                            <input type="text" className="profile-input" value={profileData.username} readOnly/>
                        </div>
                        <div className="profile-field">
                            <label className="profile-label">Email Address</label>
                            <input type="email" className="profile-input" value={profileData.email} readOnly/>
                        </div>
                    </div>

                    <div className="profile-row">
                        <div className="profile-field">
                            <label className="profile-label">First Name</label>
                            <input type="text" className="profile-input" value={profileData.first_name}/>
                        </div>
                        <div className="profile-field">
                            <label className="profile-label">Last Name</label>
                            <input type="text" className="profile-input" value={profileData.last_name}/>
                        </div>
                    </div>

                    <div className="profile-row">
                        <div className="profile-field">
                            <label className="profile-label">Phone Number</label>
                            <input type="tel" className="profile-input" value={profileData.phone}/>
                        </div>
                    </div>

                    <div className="profile-row">
                        <div className="profile-field-full">
                            <label className="profile-label">Delivery Address</label>
                            <textarea className="profile-textarea" value={profileData.address}/>
                        </div>
                    </div>

                    <div className="profile-row">
                        <div className="profile-field">
                            <label className="profile-label">City</label>
                            <input type="text" className="profile-input" value={profileData.city}/>
                        </div>
                        <div className="profile-field">
                            <label className="profile-label">Pincode</label>
                            <input type="text" className="profile-input" value={profileData.pincode}/>
                        </div>
                    </div>

                    <div className="profile-actions">
                        <button className="profile-save-btn">Save Changes</button>
                        <button className="profile-cancel-btn">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}