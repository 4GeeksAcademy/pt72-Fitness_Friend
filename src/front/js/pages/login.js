import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";
export const LogIn = () => {
    
    const navigate = useNavigate(Navigate)
    const { store, actions } = useContext(Context);
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    
	const logInUser = async() => {
        actions.login(email, password)
        navigate("/")
    }

    
	return (
		<div className="text-center mt-5">
            <div className="input-group mb-3">
                <span 
                    className="input-group-text" 
                    id="inputGroup-sizing-default"
                >    Email
                </span>
                <input 
                    onChange={(e) => setEmail(e.target.value)} 
                    type="text" className="form-control" 
                    aria-label="Sizing example input" 
                    aria-describedby="inputGroup-sizing-default"
                />
            </div>
            <div className="input-group mb-3">
                <span 
                    className="input-group-text" 
                    id="inputGroup-sizing-default"
                >   Password
                </span>
                <input 
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" 
                    className="form-control" 
                    aria-label="Sizing example input" 
                    aria-describedby="inputGroup-sizing-default"
                />
            </div>
            <button className="btn btn-info" onClick={() => logInUser()}>Log in</button>
		</div>
	);
};
