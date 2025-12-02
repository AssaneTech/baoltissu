import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});




// Add token to all requests if present
API.interceptors.request.use((config) => {
    const stored = localStorage.getItem("auth");
    if (stored) {
        const { token } = JSON.parse(stored);
        if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;