import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/api';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('adminToken'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const currentToken = localStorage.getItem('adminToken');
        if (currentToken) {
            setToken(currentToken);
            setIsAuthenticated(true);
            // Set authorization header for subsequent requests
             api.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
        } else {
            setToken(null);
            setIsAuthenticated(false);
            delete api.defaults.headers.common['Authorization'];
        }
    }, []);


    const login = useCallback(async (credentials) => {
        setIsLoading(true);
        setError('');
        try {
            const response = await loginAdmin(credentials);
            if (response.data.success && response.data.token) {
                const newToken = response.data.token;
                localStorage.setItem('adminToken', newToken);
                setToken(newToken);
                setIsAuthenticated(true);
                 // Set authorization header for subsequent requests
                api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                navigate('/dashboard');
            } else {
                setError(response.data.message || 'Login failed. Please check credentials.');
                setIsAuthenticated(false);
            }
        } catch (err) {
            console.error("Login error:", err);
            const errorMessage = err.response?.data?.message || err.message || 'An error occurred during login.';
            setError(errorMessage);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    const logout = useCallback(() => {
        localStorage.removeItem('adminToken');
        setToken(null);
        setIsAuthenticated(false);
        delete api.defaults.headers.common['Authorization'];
        navigate('/login');
    }, [navigate]);

    const value = {
        token,
        isAuthenticated,
        isLoading,
        error,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;