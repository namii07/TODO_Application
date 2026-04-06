import axios from 'axios';

/**
 * Clean architectural centralization of API endpoints using Environment Variables.
 * Uses Vite's native environment loader `import.meta.env` to dynamically swap between
 * test servers and production domains natively. 
 */
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: API_URL,
});

/**
 * Request Interceptor:
 * Ensures every single outgoing network request natively injects the latest 
 * Authorization Bearer matching strict backend specifications securely.
 */
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
