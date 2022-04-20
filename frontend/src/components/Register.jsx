// importing packages/libraries and MUI icons
import Room from "@mui/icons-material/Room";
import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';

import "./register.css";

export default function Register({setShowRegister}) {
    // setting state
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    // using useRef to hold the user inputs for registering
    const nameRef =useRef();
    const emailRef =useRef();
    const passwordRef =useRef();

    // register the new user when they click register
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        };

        try {
            await axios.post("/users/register", newUser);
            setError(false);
            setSuccess(true);

        } catch (err) {
            setError(true);
        }
    };

    // element the user sees when they click register
  return (
    <div className="registerContainer">
        <div className="logo">
            <Room/>
            CJPin
        </div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="username" ref={nameRef}/>
            <input type="email" placeholder="email" ref={emailRef}/>
            <input type="password" placeholder="password" ref={passwordRef}/>
            <button className="registerButton">Register</button>
            {success && (
                <span className="success">Successfull. You can login now.</span>
            )}
            {error && (
                <span className="failure">Something went wrong</span>
            )}
            
        </form>
        <CancelIcon className="registerCancel" onClick={() => setShowRegister(false)}/>
    </div>
  )
}
