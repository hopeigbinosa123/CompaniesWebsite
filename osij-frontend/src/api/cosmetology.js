import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const cosmetologyAPI = axios.create({
  baseURL: `${API_BASE_URL}/cosmetology/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token (only for protected endpoints)
cosmetologyAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    // Add token for protected endpoints (bookings)
    if (token && (config.url.includes('bookings'))) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
cosmetologyAPI.interceptors.response.use(
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

// Cosmetology API functions
export const cosmetologyAPIEndpoints = {
  // Services
  getServices: async () => {
    try {
      const response = await cosmetologyAPI.get('services/');
      return response.data;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },

  getServiceDetails: async (serviceId) => {
    try {
      const response = await cosmetologyAPI.get(`services/${serviceId}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching service details:', error);
      throw error;
    }
  },

  // Stylists
  getStylists: async () => {
    try {
      const response = await cosmetologyAPI.get('stylists/');
      return response.data;
    } catch (error) {
      console.error('Error fetching stylists:', error);
      throw error;
    }
  },

  getStylistDetails: async (stylistId) => {
    try {
      const response = await cosmetologyAPI.get(`stylists/${stylistId}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching stylist details:', error);
      throw error;
    }
  },

  // Appointments (require authentication)
  getUserAppointments: async () => {
    try {
      const response = await cosmetologyAPI.get('bookings/me/');
      return response.data;
    } catch (error) {
      console.error('Error fetching user appointments:', error);
      throw error;
    }
  },

  createAppointment: async (appointmentData) => {
    try {
      const response = await cosmetologyAPI.post('bookings/create/', appointmentData);
      return response.data;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  },

  // Admin functions
  getAllAppointments: async () => {
    try {
      const response = await cosmetologyAPI.get('admin/bookings/');
      return response.data;
    } catch (error) {
      console.error('Error fetching all appointments:', error);
      throw error;
    }
  },

  updateAppointment: async (appointmentId, updateData) => {
    try {
      const response = await cosmetologyAPI.patch(`admin/bookings/${appointmentId}/update/`, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw error;
    }
  },
};

// Form validation helpers
export const cosmetologyFormHelpers = {
  validateAppointmentForm: (formData) => {
    const errors = {};
    
    if (!formData.service) {
      errors.service = 'Please select a service';
    }
    
    if (!formData.stylist) {
      errors.stylist = 'Please select a stylist';
    }
    
    if (!formData.appointment_date) {
      errors.appointment_date = 'Please select an appointment date';
    } else {
      const selectedDate = new Date(formData.appointment_date);
      const now = new Date();
      if (selectedDate <= now) {
        errors.appointment_date = 'Appointment date must be in the future';
      }
    }
    
    return errors;
  },

  formatServiceCategory: (category) => {
    const categoryMap = {
      'hair': 'Hair Services',
      'skin': 'Skincare',
      'makeup': 'Makeup',
      'spa': 'Spa Treatments',
      'nails': 'Nail Services',
    };
    return categoryMap[category] || category;
  },

  formatAppointmentStatus: (status) => {
    const statusMap = {
      'pending': 'Pending',
      'confirmed': 'Confirmed',
      'completed': 'Completed',
      'cancelled': 'Cancelled',
    };
    return statusMap[status] || status;
  },

  formatDuration: (minutes) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  },

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

export default cosmetologyAPIEndpoints;
