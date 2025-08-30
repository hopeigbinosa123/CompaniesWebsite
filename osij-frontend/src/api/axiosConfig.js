// src/api/axiosConfig.js
import axios from 'axios';

// Create an axios instance with a base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 Unauthorized responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., redirect to login or refresh token)
      console.error('Unauthorized access - please log in again');
      // Optionally clear user session
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      // Optionally redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;