import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import api from '../api/axiosConfig';
import { auth } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // In AuthContext.js
useEffect(() => {
  const verifyToken = async () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        // Set the auth header before making the request
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        const response = await api.get('/auth/profile/');
        setUser(response.data);
      } catch (error) {
        console.error('Session verification failed:', error);
        // Clear invalid token
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
      }
    }
    setLoading(false);
  };

  verifyToken();
}, []);
  // Function to handle login
  // In AuthContext.js
const login = async (userData, token) => {
  // Set the token in localStorage
  localStorage.setItem('token', token);
  
  // Set the default Authorization header for all axios requests
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
  // Set user data in state
  setUser(userData);
  setToken(token);
};



  const register = async (userData) => {
    const response = await auth.register(userData);
    if (response.token) {
      login(response.user, response.token);
    }
    return response;
  };
  
  // Function to handle logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      logout, 
      register,
      loading,
      isAuthenticated: !!user && !!token
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};