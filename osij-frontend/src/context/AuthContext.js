// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axiosConfig'; // Import the configured axios instance

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true); // Add loading state

  // Function to fetch user profile using the token
  const fetchUserProfile = async (authToken) => {
    try {
      const response = await api.get('/auth/profile/'); // Adjust endpoint to match your API
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      logout(); // Logout if token is invalid
    }
  };

  // Function to handle login
  const login = async (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('token', authToken);
    // The axios interceptor in axiosConfig.js will now automatically add this token to requests
  };

  // Function to handle logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    // The axios interceptor will stop adding the token to requests
  };

  // Check if we have a token on app start
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      
      if (storedToken) {
        setToken(storedToken);
        try {
          await fetchUserProfile(storedToken);
        } catch (error) {
          console.error('Authentication initialization failed:', error);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const value = {
    user,
    token,
    login,
    logout,
    loading,
    isAuthenticated: !!user && !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};