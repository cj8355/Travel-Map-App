import Room from "@mui/icons-material/Room";
import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import "./login.css";
import CancelIcon from '@mui/icons-material/Cancel';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

export default function Login({setShowLogin, myStorage, setCurrentUser}) {
    const [error, setError] = useState(false);
    const nameRef =useRef();
    const passwordRef =useRef();
    const clientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const [showLoginButton, setShowLoginButton] = useState(true);
    const [showLogoutButton, setshowLogoutButton] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            username: nameRef.current.value,
            password: passwordRef.current.value
        };

        try {
            const res = await axios.post("/users/login", user);
            myStorage.setItem("user", res.data.username);
            setCurrentUser(res.data.username);
            setShowLogin(false);
            setError(false);

        } catch (err) {
            setError(true);
        }
    };

    const onLoginSuccess = (res) => {
        console.log("Login successful", res.profileObj);
        setShowLoginButton(false);
        setshowLogoutButton(true);
    };

    const onLoginFailure = (res) => {
        console.log("Login failed", res);
    };

    const onSignoutSuccess = () => {
        alert("Signed out!");
        setShowLoginButton(true);
        setshowLogoutButton(false);
        console.clear();
    };

  return (
    <div className="loginContainer">
        <div className="logo">
            <Room/>
            CJPin1
        </div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="username" ref={nameRef}/>
            <input type="password" placeholder="password" ref={passwordRef}/>
            <button className="loginButton">Login</button>
            
            {error && (
                <span className="failure">Something went wrong</span>
            )}
            
        </form>
        
        <CancelIcon className="loginCancel" onClick={() => setShowLogin(false)}/>

        <div className="googleLogin">
            {showLoginButton ? 
            <GoogleLogin
                clientId={clientID}
                buttonText="Login"
                onSuccess={onLoginSuccess}
                onFailure={onLoginFailure}
                cookiePolicy={'single_host_origin'}
            /> : null
            }

    {showLogoutButton ?
    <GoogleLogout
        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={onSignoutSuccess}
        >
        </GoogleLogout> : null
    }
        </div>
    </div>
  )
}
