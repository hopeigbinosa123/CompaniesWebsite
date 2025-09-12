import api from './axiosConfig';

export const auth = {

  // login function
  login: async (username, password) => {
    try {
      console.log('Attempting login with:', { username, password: '***' });
      
      const response = await api.post('/auth/login/', { 
        username, 
        password 
      });
      
      console.log('Login response:', response.data);
      
      // Store the token and user data
      if (response.data && response.data.access) {
        localStorage.setItem('token', response.data.access);
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
      } else {
        throw new Error('No access token received');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  },

  // Register function
  register: async (userData) => {
    try {

      console.log('Attempting registration with:', userData);
      const response = await api.post('/auth/register/', userData);
      
      // Auto-login after registration
      if (response.data.access) {
        localStorage.setItem('token', response.data.access);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data;
      } else {
        throw new Error('No access token received');
      }
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage regardless of API call success
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete api.defaults.headers.common['Authorization'];
    }
  },

  getCurrentUser: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return null;
      }
      
      const response = await api.get('/auth/profile/');
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  getAuthHeader: () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export default auth;