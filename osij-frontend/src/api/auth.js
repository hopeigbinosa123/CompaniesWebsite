import api from './axiosConfig';

export const auth = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login/', { email, password });
      if (response.data.access) {
        localStorage.setItem('token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register/', userData);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/user/');
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },
};