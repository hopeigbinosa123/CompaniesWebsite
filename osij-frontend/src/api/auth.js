import api from './axiosConfig';

// Fetch CSRF token before making any authenticated requests
const fetchCSRFToken = async () => {
  try {
    const response = await api.get('/auth/csrf/');
    console.log('CSRF token fetched');
    return response.data.csrf_token;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    throw error;
  }
};

export const auth = {
  login: async (username, password) => {
    try {
      // First ensure we have a CSRF token
      await fetchCSRFToken();
      
      const response = await api.post('/auth/login/', { username, password });
      console.log('Login response:', response.data); // Log the response
      
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

  register: async (userData) => {
    try {
      // Ensure we have a CSRF token before registration
      await fetchCSRFToken();
      
      const response = await api.post('/auth/register/', userData);
      
      // Auto-login after registration
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
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
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Clear CSRF token
      document.cookie = 'csrftoken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  },

  getCurrentUser: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;
      
      const response = await api.get('/auth/profile/');
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error.response?.data || error.message);
      // If unauthorized, clear the invalid token
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
      throw error;
    }
  },

  getAuthHeader: () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Token ${token}` } : {};
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export default auth;