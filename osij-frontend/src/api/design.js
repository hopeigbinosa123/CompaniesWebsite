import api from './axiosConfig';

const designService = {
  // Designers
  getDesigners: async () => {
    try {
      const response = await api.get('/graphic-design/designers/');
      return response.data;
    } catch (error) {
      console.error('Error fetching designers:', error);
      throw error;
    }
  },

  getDesignerDetails: async (id) => {
    try {
      const response = await api.get(`/graphic-design/designers/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching designer ${id}:`, error);
      throw error;
    }
  },

  // Orders
  createOrder: async (orderData) => {
    try {
      const response = await api.post('/graphic-design/orders/create/', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  getUserOrders: async () => {
    try {
      const response = await api.get('/graphic-design/orders/me/');
      return response.data;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
  },

  getOrderDetails: async (orderId) => {
    try {
      const response = await api.get(`/graphic-design/orders/${orderId}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching order ${orderId}:`, error);
      throw error;
    }
  },

  updateOrder: async (orderId, updateData) => {
    try {
      const response = await api.patch(
        `/graphic-design/admin/orders/${orderId}/update/`,
        updateData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating order ${orderId}:`, error);
      throw error;
    }
  },
};

export default designService;