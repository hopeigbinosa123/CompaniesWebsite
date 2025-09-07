import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import api from '../api/axiosConfig';

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
        api.defaults.headers.common['Authorization'] = `Token ${storedToken}`;
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
  const login = (authToken, userData) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('token', authToken);
    axios.defaults.headers.common['Authorization'] = `Token ${authToken}`;
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