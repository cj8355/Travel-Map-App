import Room from "@mui/icons-material/Room";
import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import "./login.css";
import CancelIcon from '@mui/icons-material/Cancel';

export default function Login({setShowLogin}) {
    const [error, setError] = useState(false);
    const nameRef =useRef();
    const passwordRef =useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            username: nameRef.current.value,
            password: passwordRef.current.value
        };

        try {
            await axios.post("/users/login", user);
            setError(false);

        } catch (err) {
            setError(true);
        }
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
    </div>
  )
}
