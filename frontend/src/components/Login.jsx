// importing packages/libraries and MUI icons
import Room from "@mui/icons-material/Room";
import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

import "./login.css";

export default function Login({setShowLogin, myStorage, setCurrentUser}) {
    // setting state
    const [error, setError] = useState(false);
    const [showLoginButton, setShowLoginButton] = useState(true);
    const [showLogoutButton, setshowLogoutButton] = useState(false);

    // using useRef to store the users name and password
    const nameRef =useRef();
    const passwordRef =useRef();

    // hiding clientID
    const clientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    // function to handle the user clicking login
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

    // hide the login button and show the log out button when the user logs in
    const onLoginSuccess = (res) => {
        console.log("Login successful", res.profileObj);
        setShowLoginButton(false);
        setshowLogoutButton(true);
    };

    // if the login fails, send the response
    const onLoginFailure = (res) => {
        console.log("Login failed", res);
    };

    // alert to the user that they signed out, show login btn, hide logout btn
    const onSignoutSuccess = () => {
        alert("Signed out!");
        setShowLoginButton(true);
        setshowLogoutButton(false);
        console.clear();
    };

    // element the user sees when they click login
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
