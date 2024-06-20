import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

function Form({route, method}){ // route: the route we want to when we submit the form [token / register]
                                // method: registering or locking in??
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState("")
    const navigate = useNavigate()

    const name = method === "login" ? "Login" : "Register" // sets the value of the 'name' based on the 'method' prop passed to the form
                                                           // indicates whether the form is used for logging in or registering a new user.
                                                           // an 'if-else' statement
                                                   
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
    
        try{
            const res = await api.post(route, { username, password }) // goes to catch if theres an error with the request

            if (method == "login") { // check if the method was login
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/") // home
            } else { 
                navigate("/login") // if it was register go to login.
            }

        }
        catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    return <form onSubmit={handleSubmit} className = 'form-container'>
        <h1>{name}</h1>
        <input 
            className = "form-input"
            type = "text"
            value = {username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
        />
        <input 
            className = "form-input"
            type = "password"
            value = {password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        />
        {loading && <LoadingIndicator />}
        <button className="form-button" type="submit">
            {name}
        </button>

    </form>
}

export default Form