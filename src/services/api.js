import axios from 'axios';

// Set the base URL for your backend API
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Auth Service
export const loginAdmin = (credentials) => api.post('/auth/login', credentials);

// User Services
export const getUsers = () => api.get('/users');
export const getUser = (id) => api.get(`/users/${id}`);

// For create/update, handle FormData specifically
export const createUser = (userData) => {
    return api.post('/users', userData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const updateUser = (id, userData) => {
    return api.put(`/users/${id}`, userData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const deleteUser = (id) => api.delete(`/users/${id}`);

// Stats Service
export const getDashboardStats = () => api.get('/stats');

export default api; // Optional default export

// Helper to get full image URL
export const getProfilePictureUrl = (imagePath) => {
    if (!imagePath) {
        return null
    };
    const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    return `${backendBaseUrl}/${imagePath.replace(/\\/g, '/')}`;
}