// wrapper for protected route
    // handles user authentication for accessing protected routes withint the application

import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

// check if we are authorized below they can access the route.
function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null); // neither authorized or unuthorized

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false)) // 'auth()' function checks for an existing access token.
                                                   // if present, decodes the token to check the expiration.
    }, [])

    const refreshToken = async () => { // called if the token is expired. makes an API call to refresh the token using a refresh token in the 'localStorage'
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;