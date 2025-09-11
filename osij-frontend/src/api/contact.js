import axios from 'axios';
// Base URL for API requests
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
// Create axios instance for contact API
const contactAPI = axios.create({
  baseURL: `${API_BASE_URL}/notifications/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token (only for protected endpoints)
contactAPI.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('access_token');
    // Only add token for protected endpoints (not for contact/submit/)
    if (token && !config.url.includes('contact/submit/')) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
contactAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Contact API endpoints
export const contactAPIEndpoints = {
  // Submit contact form
  submitContactForm: async (formData) => {
    try {
      const response = await contactAPI.post('contact/submit/', formData);
      return response.data;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  },

  // Get all contact messages (admin only)
  getContactMessages: async () => {
    try {
      const response = await contactAPI.get('contact/messages/');
      return response.data;
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      throw error;
    }
  },

  // Mark message as read (admin only)
  markMessageAsRead: async (messageId) => {
    try {
      const response = await contactAPI.patch(`contact/messages/${messageId}/mark-read/`);
      return response.data;
    } catch (error) {
      console.error('Error marking message as read:', error);
      throw error;
    }
  },

  // Get message details (admin only)
  getMessageDetails: async (messageId) => {
    try {
      const response = await contactAPI.get(`messages/${messageId}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching message details:', error);
      throw error;
    }
  },
};

// Form validation helpers
export const contactFormHelpers = {
  validateContactForm: (formData) => {
    const errors = {};
    
    if (!formData.name || formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long';
    } // Name validation
    
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    } // Email validation
    
    if (!formData.subject || formData.subject.trim().length < 3) {
      errors.subject = 'Subject must be at least 3 characters long';
    } // Subject validation
    
    if (!formData.message || formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    } // Message validation
    
    return errors;
  },
  // Format contact type
  formatContactType: (contactType) => {
    const typeMap = {
      'general': 'General Inquiry',
      'software': 'Software Services',
      'design': 'Graphic Design',
      'cosmetology': 'Cosmetology Booking',
    };
    return typeMap[contactType] || contactType;
  },
  // Format date
  formatDate: (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },
};

export default contactAPIEndpoints;
