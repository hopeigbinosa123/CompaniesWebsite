import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const cosmetologyAPI = axios.create({
  baseURL: `${API_BASE_URL}/cosmetology/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔐 Attach token to requests
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

// 🚫 Handle 401 errors
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

// ✅ Individual named exports
export const createAppointment = async (data) => {
  const { data: response } = await cosmetologyAPI.post('appointments/', data);
  return response;
};

export const checkAppointmentAvailability = async (stylist, start_time, duration_minutes) => {
  const { data } = await cosmetologyAPI.post('check-availability/', {
    stylist,
    start_time,
    duration_minutes,
  });
  return data;
};

// ✅ Grouped endpoints

// ✅ Named export for endpoint
export const cosmetologyAPIEndpoints = {
  getServices: async () => {
    const { data } = await cosmetologyAPI.get('services/');
    return data;
  },
  getService: async (id) => {
    const { data } = await cosmetologyAPI.get(`services/${id}/`);
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
};


// ✅ Form helper
// ✅ Named export for form helpers
export const cosmetologyFormHelpers = {
  validateBookingForm: (formData) => {
    const errors = {};
    if (!formData.service?.trim()) errors.service = 'Service is required';
    if (!formData.stylist?.trim()) errors.stylist = 'Stylist is required';
    if (!formData.appointment_date?.trim()) errors.appointment_date = 'Date and time are required';
    return errors;
  },
  validateAppointmentForm: (formData) => {
    const errors = {};
    if (!formData.service?.trim()) errors.service = 'Service is required';
    if (!formData.stylist?.trim()) errors.stylist = 'Stylist is required';
    if (!formData.appointment_date?.trim()) errors.appointment_date = 'Date and time are required';
    return errors;
  },
  formatDuration: (minutes) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes === 0
      ? `${hours} hr${hours > 1 ? 's' : ''}`
      : `${hours} hr${hours > 1 ? 's' : ''} ${remainingMinutes} min`;
  },
};


// ✅ Default export (optional, if used elsewhere)

export default cosmetologyAPIEndpoints;

