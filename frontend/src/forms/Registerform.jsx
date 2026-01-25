import './Registerform.css'
import axios from "axios"
import { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
export default function Register()
{
    const [passwdvisible,setpasswdvisible]=useState(false)
    const [confirmpasswdvisible,setconfirmpasswdvisible]=useState(false)
    const [formdata,setformdata]=useState(
    {username: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    password: "",
    confirmPassword: ""}
    )
    const [loading,setloading]=useState(false);
    const navigate=useNavigate();

    const handlechange=(e)=>{
        setformdata({...formdata,[e.target.name]:e.target.value});
    };
    const getCSRF = () =>document.cookie.split("; ").find(row => row.startsWith("csrftoken="))?.split("=")[1];

    const handleRegistrationSubmit=async(e)=>
    {
        e.preventDefault();
        if(formdata.password!==formdata.confirmPassword)
        {
            alert("Password didnot match !!");
            return;
        }
        setloading(true)
        try{
            const csrftoken = getCSRF();
            const response=await axios.post(
                "http://localhost:8000/api/register/",
                {
                    username:formdata.username,
                    email:formdata.email,
                    first_name:formdata.firstName,
                    last_name:formdata.lastName,
                    phone: formdata.phone,
                    address: formdata.address,
                    city: formdata.city,
                    pincode: formdata.pincode,
                    password: formdata.password
                },
                {
                    headers:{
                        "Content-Type":"application/json",
                        "X-CSRFToken":csrftoken
                    },
                    withCredentials:true,
                }
            );
            console.log(response.data);
            setformdata({
                username: "",
                email: "",
                firstName: "",
                lastName: "",
                phone: "",
                address: "",
                city: "",
                pincode: "",
                password: "",
                confirmPassword: ""
            });
            alert("profile created successfully!!");
            navigate("/");
        }
        catch (error) {
            console.log("ERROR OBJECT:", error);
            console.log("ERROR RESPONSE:", error.response);
            console.log("ERROR DATA:", error.response?.data);
            console.log("ERROR STATUS:", error.response?.status);
            
            alert(
            error.response?.data?.error || 
            "Registration failed"
            );
        }

        finally{
            setloading(false);
        }
    }
    
    return(
        <div className="register">
            <div className="form-container">
            <div className="form-header">
                <div className="logo"><span className="green">green</span>Grocers</div>
                <div className="subtitle">Create your account and start shopping fresh</div>
            </div>

            <div className="form-container">
                <form id="registrationForm" onSubmit={handleRegistrationSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" required onChange={handlechange}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" name="email" required onChange={handlechange}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" name="firstName" required onChange={handlechange}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" name="lastName" required onChange={handlechange}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone" required onChange={handlechange}/>
                        </div>

                        <div className="form-group full-width">
                            <label htmlFor="address">Delivery Address</label>
                            <textarea id="address" name="address" placeholder="House/Flat No., Street, Landmark..." onChange={handlechange} required></textarea>
                        </div>

                        <div className="form-group full-width">
                            <div className="city-pincode">
                                <div>
                                    <label htmlFor="city">City</label>
                                    <input type="text" id="city" name="city" required onChange={handlechange}/>
                                </div>
                                <div>
                                    <label htmlFor="pincode">Pincode</label>
                                    <input type="text" id="pincode" name="pincode" pattern="\d{6}" maxLength={6} onChange={handlechange} required/>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="password-wrapper">
                                <input type={passwdvisible? "text":"password"} id="password" name="password" required onChange={handlechange}/>
                                <button type="button" className="password-toggle" onClick={()=>setpasswdvisible(!passwdvisible)}>
                                    {passwdvisible? "🙈":"👁️"}
                                </button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className="password-wrapper">
                                <input type={confirmpasswdvisible? "text":"password"} id="confirmPassword" name="confirmPassword" onChange={handlechange} required/>
                                <button type="button" className="password-toggle" onClick={()=>setconfirmpasswdvisible(!confirmpasswdvisible)}>
                                    {confirmpasswdvisible? "🙈":"👁️"}
                                </button>
                            </div>
                        </div>
                    </div>

                    <button type='submit' className="submit-btn" disabled={loading}>Create Account{loading && <div className="spinner"></div>}</button>
                     
                    <div className="login-link">
                        Already have an account? <Link to='/login'>Sign In</Link>
                    </div>
                </form>
            </div>
        </div>
        </div>
    )
}