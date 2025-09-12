import api from './axiosConfig';

const cosmetologyService = {
  // Services
  getServices: async () => {
    try {
      const response = await api.get('/cosmetology/services/');
      return response.data;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },

  getServiceDetails: async (id) => {
    try {
      const response = await api.get(`/cosmetology/services/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching service ${id}:`, error);
      throw error;
    }
  },

  // Stylists
  getStylists: async () => {
    try {
      const response = await api.get('/cosmetology/stylists/');
      return response.data;
    } catch (error) {
      console.error('Error fetching stylists:', error);
      throw error;
    }
  },

  getStylistDetails: async (id) => {
    try {
      const response = await api.get(`/cosmetology/stylists/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching stylist ${id}:`, error);
      throw error;
    }
  },

  // Bookings
  createBooking: async (bookingData) => {
    try {
      const response = await api.post('/cosmetology/bookings/me/', bookingData);
      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  getUserBookings: async () => {
    try {
      const response = await api.get('/cosmetology/bookings/me/');
      return response.data;
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      throw error;
    }
  },
};

export default cosmetologyService;
