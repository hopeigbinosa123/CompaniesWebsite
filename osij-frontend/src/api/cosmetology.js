import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const cosmetologyAPI = axios.create({
  baseURL: `${API_BASE_URL}/cosmetology/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

// ✅ Named export for endpoints
export const cosmetologyAPIEndpoints = {
  getServices: async () => {
    const { data } = await cosmetologyAPI.get('services/');
    return data;
  },
  createBooking: async (bookingData) => {
    const { data } = await cosmetologyAPI.post('bookings/', bookingData);
    return data;
  },
  getStylists: async () => {
    const { data } = await cosmetologyAPI.get('stylists/');
    return data;
  },
  getStylist: async (id) => {
    const { data } = await cosmetologyAPI.get(`stylists/${id}/`);
    return data;
  },
  createAppointment: async (data) => {
    const { data: response } = await cosmetologyAPI.post('appointments/', data);
    return response;
  },
};

// ✅ Named export for form helpers
export const cosmetologyFormHelpers = {
  validateBookingForm: (formData) => {
    const errors = {};
    if (!formData.service?.trim()) errors.service = 'Service is required';
    if (!formData.stylist?.trim()) errors.stylist = 'Stylist is required';
    if (!formData.appointment_date?.trim()) errors.appointment_date = 'Date and time are required';
    return errors;
  }
};

// ✅ Default export (optional, if used elsewhere)
export default cosmetologyAPIEndpoints;

