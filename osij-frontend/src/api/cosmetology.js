<<<<<<< HEAD

import api from "./axiosConfig";

// Get all stylists
export const getStylists = () => api.get("/api/cosmetology/stylists/");

// Get one stylist
export const getStylist = (id) => api.get(`/api/cosmetology/stylists/${id}/`);

// Create a new appointment
export const createAppointment = (data) => api.post("/api/cosmetology/appointments/", data);
=======
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const cosmetologyAPI = axios.create({
  baseURL: `${API_BASE_URL}/cosmetology/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token if present
cosmetologyAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 globally
cosmetologyAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const cosmetologyService = {
  // Services
  getServices: async () => {
    const { data } = await cosmetologyAPI.get('services/');
    return data;
  },

  // Bookings
  createBooking: async (bookingData) => {
    const { data } = await cosmetologyAPI.post('bookings/', bookingData);
    return data;
  },
};

export default cosmetologyService;

>>>>>>> 85c70677a912d112ee4c8ddeb8cbb9bba28816a4
