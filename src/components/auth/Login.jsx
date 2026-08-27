import React, { useContext, useState } from "react";
import axios from "axios";
import api from "../../api/api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { setToken, setUser } = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        const data = {username,password};

        try {
            const res = await api.post("core/auth/login/", data);
            console.log("try login")
            console.log("Response", res);

            if (res.data.error){
                setError(res.data.error)
            }

            // deconstruct
            const {access_token,refresh,username,role} = res.data;
            console.log("access_token", access_token)

            // Create user object
            const userData = { username, role};

            // Save to context
            setToken(access_token);
            setUser(userData);

            // Save to localStorage
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh", refresh);
            localStorage.setItem("user", JSON.stringify(userData));

            // ROLE-BASED REDIRECT
            if (role === "admin") {
                navigate("/admin-dashboard");
            } else if (role === "farmer") {
                navigate("/farmer-dashboard");
            } else if (role === "porter") {
                navigate("/porter-dashboard");
            }
            // } else {
            //     navigate("/not-authorized");
            // }


        } catch (error) {
            setError(error.response?.data?.error || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm" >
                <h1 className="text-2xl font-bold text-center mb-6 text-green-600"> Login </h1>

                {/* SUCCESS MESSAGE */}
                {success && (<div className="mb-4 text-green-600 bg-green-100 p-2 rounded text-sm text-center"> {success}</div>)}

                {/* ERROR MESSAGE */}
                {error && (<div className="mb-4 text-red-600 bg-red-100 p-2 rounded text-sm text-center"> {error} </div>)}

                <input type="text" placeholder="Username" className="input-field mb-5" required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input type="password" placeholder="Password" className="input-field mb-5" required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" disabled={loading}
                    className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 disabled:opacity-50"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;