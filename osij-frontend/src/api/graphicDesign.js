<<<<<<< HEAD
import api from "./axiosConfig";

// Get all designers
export const getDesigners = () => api.get("/api/graphic_design/designers/");

// Get one designer
export const getDesigner = (id) => api.get(`/api/graphic_design/designers/${id}/`);

// Create a new design order
export const createDesignOrder = (data) => api.post("/api/graphic_design/orders/", data);
=======
import api from './axiosConfig';

// Graphic Design API endpoints
export const graphicDesignAPI = {
  // Get all designers
  getDesigners: async () => {
    try {
      const response = await api.get('/api/graphic-design/designers/');
      return response.data;
    } catch (error) {
      console.error('Error fetching designers:', error);
      throw error;
    }
  },

  // Get designer details
  getDesignerDetails: async (designerId) => {
    try {
      const response = await api.get(`/api/graphic-design/designers/${designerId}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching designer details:', error);
      throw error;
    }
  },

  // Create a new design order
  createOrder: async (orderData) => {
    try {
      console.log('Creating order with data:', orderData);
      const response = await api.post('/api/graphic-design/orders/create/', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error.response?.data || error.message);
      throw error;
    }
  },

  // Get current user's orders
  getUserOrders: async () => {
    try {
      const response = await api.get('/api/graphic-design/orders/me/');
      return response.data;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
  },

  // Get specific order details
  getOrderDetails: async (orderId) => {
    try {
      const response = await api.get(`/api/graphic-design/orders/${orderId}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order details:', error);
      throw error;
    }
  },

  // Update order status (admin only)
  updateOrderStatus: async (orderId, statusData) => {
    try {
      const response = await api.patch(`/api/graphic-design/admin/orders/${orderId}/update/`, statusData);
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }
};

// Helper functions for order management
export const orderHelpers = {
  // Format order status for display
  formatStatus: (status) => {
    const statusMap = {
      'PENDING': 'Pending',
      'APPROVED': 'Approved',
      'IN_PROGRESS': 'In Progress',
      'REJECTED': 'Rejected',
      'COMPLETED': 'Completed'
    };
    return statusMap[status] || status;
  },

  // Get status color for UI
  getStatusColor: (status) => {
    const colorMap = {
      'PENDING': 'text-yellow-600 bg-yellow-100',
      'APPROVED': 'text-blue-600 bg-blue-100',
      'IN_PROGRESS': 'text-purple-600 bg-purple-100',
      'REJECTED': 'text-red-600 bg-red-100',
      'COMPLETED': 'text-green-600 bg-green-100'
    };
    return colorMap[status] || 'text-gray-600 bg-gray-100';
  },

  // Validate order form data
  validateOrderForm: (formData) => {
    const errors = {};
    
    if (!formData.title?.trim()) {
      errors.title = 'Title is required';
    }
    
    if (!formData.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.design_type?.trim()) {
      errors.design_type = 'Design type is required';
    }
    
    if (!formData.description?.trim()) {
      errors.description = 'Description is required';
    }
    
    return errors;
  }
};

export default graphicDesignAPI;
>>>>>>> 85c70677a912d112ee4c8ddeb8cbb9bba28816a4
