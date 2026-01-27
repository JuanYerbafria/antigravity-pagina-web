import axios from 'axios';

// Create an axios instance with a base URL
// If VITE_API_URL is defined (e.g., in production), use it
// Otherwise, rely on the proxy in vite.config.js (development)
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
