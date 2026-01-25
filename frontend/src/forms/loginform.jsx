import './loginform.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
export default function Login({setauth})
{
    const [passwdvisible,setpasswdvisible]=useState(false);
    const [loading,setloading]=useState(false);
    const [formdata,setformdata]=useState(
        {
            username:"",
            password:""
        }
    );
    const navigate=useNavigate();
    const handleChange=(e)=>{
        setformdata(
            {...formdata,[e.target.name]:e.target.value}
        );
    };
    const getCSRF = () =>document.cookie.split("; ").find(row => row.startsWith("csrftoken="))?.split("=")[1];

    const handlelogin=async(e)=>
    {
        e.preventDefault();
        setloading(true);
        try{
            const csrftoken = getCSRF();
            const response=await axios.post(
                "http://localhost:8000/api/login/",
                {
                    username:formdata.username,
                    password:formdata.password
                },
                {
                    headers:{
                        'Content-Type':'application/json',
                        "X-CSRFToken":csrftoken
                    },
                    withCredentials:true
                }
            )
            console.log(response.data)
            setauth({
                isLoggedIn:true,
                username: response.data.user_name,
            });
            alert("successfully logged in ..");
            navigate('/');         
        }
        catch(error)
        {
            alert(error.response?.data?.message || "Login failed");

        }
        finally{
            setloading(false);
        }
    }

    return(
        <div className="login">
            <div className="form-container">
                <div className="form-header">
                    <div className="logo"><span className="green">green</span>Grocers</div>
                    <div className="subtitle">Log into your account and start shopping fresh</div>
                </div>
                <form id="loginForm" onSubmit={handlelogin}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="username">Username </label>
                            <input type="text" id="username" name="username" onChange={handleChange} required/>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="password-wrapper">
                                <input type={passwdvisible? "text":"password"} id="password"  onChange={handleChange} name="password" required/>
                                <button type="button" className="password-toggle" onClick={()=>setpasswdvisible(!passwdvisible)}>
                                    {passwdvisible? "🙈":"👁️"}
                                </button>
                            </div>
                        </div>
                        <br/>
                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading?"logging in....":"Log in"}
                            </button>{loading && <div className="spinner"></div>}
                    </div>
                </form>
            </div>
        </div>
    )
}