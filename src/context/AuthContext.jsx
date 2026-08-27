import { createContext, useCallback, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

// Create a global authentication context
// This allows us to access user + token anywhere in the app
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    // -----------------------------
    // AUTH STATE (INITIAL LOAD)
    // -----------------------------

    // Load JWT token from localStorage so login persists on refresh
    const [token, setToken] = useState(
        () => localStorage.getItem("access_token") || ""
    );

    // Load user data from localStorage (if available)
    // We wrap JSON.parse in try/catch to avoid app crashes on invalid data
    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem("user");
            return stored ? JSON.parse(stored) : null;
        } catch (err) {
            return null;
        }
    });

    // -----------------------------
    // LOGOUT FUNCTION
    // -----------------------------

    // Clears all authentication data and redirects user to login page
    const logout = useCallback(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");

        setToken("");
        setUser(null);

        navigate("/login");
    }, [navigate]);

    // -----------------------------
    // TOKEN EXPIRY CHECK
    // -----------------------------

    // Runs every time token changes
    // Decodes JWT and checks if it is expired
    useEffect(() => {
        if (!token) return;

        try {
            const decoded = jwtDecode(token);

            // JWT "exp" is in seconds → convert to milliseconds
            const isExpired = decoded.exp * 1000 < Date.now();

            // If token is expired, force logout
            if (isExpired) {
                logout();
            }
        } catch (err) {
            // If token is invalid or corrupted → logout user
            logout();
        }
    }, [token, logout]);

    // -----------------------------
    // PROVIDER VALUE (GLOBAL STATE)
    // -----------------------------

    // Everything inside "value" becomes accessible in the app
    return (
        <AuthContext.Provider
            value={{
                token,      // JWT access token
                setToken,   // update token after login/refresh
                user,       // logged-in user data
                setUser,    // update user info
                logout,     // manual logout function
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};