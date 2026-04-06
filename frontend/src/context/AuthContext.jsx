import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a configured axios instance
export const api = axios.create({
    baseURL: 'http://localhost:5000',
});

// Interceptor to inject token on every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Try to load user on initial render
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const { data } = await api.get('/getuser');
                    setUser(data);
                } catch (error) {
                    console.error('Failed to authenticate token:', error);
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setLoading(false);
        };
        fetchUser();
    }, []);

    const login = (token, userData) => {
        localStorage.setItem('token', token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const updateUser = (userData) => {
        setUser(userData);
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
