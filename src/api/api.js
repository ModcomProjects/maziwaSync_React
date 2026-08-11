import axios from "axios";

// Create a reusable Axios instance.
// This prevents us from repeating the API URL in every request.
const api = axios.create({
    baseURL: "https://milksync.alwaysdata.net/api/",
    headers: {
        // Tell the backend that we are sending JSON data.
        "Content-Type": "application/json",
    },
});

// Interceptors run before every request.
// Here we automatically attach the JWT access token
// so protected endpoints can identify the logged-in user.
api.interceptors.request.use((config) => {

    // Get the token saved after login.
    const access_token = localStorage.getItem("access_token");

    // If a token exists, add it to the Authorization header.
    if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`;
    }

    // Always return the config so the request can continue.
    return config;
});

export default api;