import api from './axiosConfig';
// Authentication API calls

export const auth = {
  login: async (username, password) => {
    try {
      const response = await api.post('/auth/login/', { username, password });
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (userData) => {
    // Registers a new user
    try {
      const response = await api.post('/auth/register/', userData); //calls  from axiosConfig.js
                 return response.data;
    }            catch (error) {
                 console.error('Registration error:', error);
                 throw error;
          }
  },

  logout: () => {
    // Logs out user by removing tokens
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
  },

  getCurrentUser: async () => {
    // fetches current user's details
    try {
      const response = await api.get('/auth/user/');
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },
};