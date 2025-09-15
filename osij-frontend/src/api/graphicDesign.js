import api from './axiosConfig';

// Graphic Design API endpoints
export const graphicDesignAPI = {
  // Get all designers
  getDesigners: async () => {
    try {
      const response = await api.get('/designers/');
      return response.data;
    } catch (error) {
      console.error('Error fetching designers:', error);
      throw error;
    }
  },

  // Get one designer
  getDesigner: async (id) => {
    try {
      const response = await api.get(`/designers/${id}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching designer:', error);
      throw error;
    }
  },

  // Create a new design order
  createDesignOrder: async (data) => {
    try {
      const response = await api.post('/graphic-design/design-orders/', data);
      return response.data;
    } catch (error) {
      console.error('Error creating design order:', error);
      throw error;
    }
  },

  // Get current user's orders
  getUserOrders: async () => {
    try {
      const response = await api.get('/design-orders/me/');
      return response.data;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
  },

  // Get specific order details
  getOrderDetails: async (orderId) => {
    try {
      const response = await api.get(`/design-orders/${orderId}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order details:', error);
      throw error;
    }
  },

  // Update order status (admin only)
  updateOrderStatus: async (orderId, statusData) => {
    try {
      const response = await api.patch(`/design-orders/admin/${orderId}/update/`, statusData);
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }
};

// Helper functions for order management
export const orderHelpers = {
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

  validateOrderForm: (formData) => {
    const errors = {};

    if (!formData.title?.trim()) {
      errors.title = 'Title is required';
    }

    if (!formData.brief?.trim()) {
      errors.brief = 'Project brief is required';
    }

    if (formData.budget && isNaN(formData.budget)) {
      errors.budget = 'Budget must be a number';
    }

    return errors;
  }
};

export default graphicDesignAPI;
