import { useState, useEffect } from 'react';
import { graphicDesignAPI, orderHelpers } from '../api/graphicDesign';

const GraphicDesignOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    try {
      setLoading(true);
      const response = await graphicDesignAPI.getUserOrders();
      setOrders(response);
      setError('');
    } catch (err) {
      console.error('Error fetching orders:', err);
      if (err.response?.status === 401) {
        setError('Please log in to view your orders.');
      } else {
        setError('Failed to load your orders. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const viewDetailsHandler= (orderId) =>{
    const order = orders.find(o => o.id === orderId);
    setSelectedOrder(order);
    setShowModal(true);

  };

  const handleCloseModal = () =>{
    setSelectedOrder(null);
    setShowModal(false);

  };



  if (loading) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <span className="ml-2 text-gray-600">Loading your orders...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            <p>{error}</p>
            <button
              onClick={fetchUserOrders}
              className="mt-2 text-red-700 hover:text-red-800 underline text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Graphic Design Orders</h1>
          <button
            onClick={fetchUserOrders}
            className="text-purple-600 hover:text-purple-700 text-sm font-medium"
          >
            Refresh
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600 mb-4">You haven't placed any graphic design orders yet.</p>
            <a
              href="/contact"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
            >
              Place Your First Order
            </a>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{order.title}</h3>
                    <p className="text-sm text-gray-600">Order #{order.id}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${orderHelpers.getStatusColor(order.status)}`}>
                    {orderHelpers.formatStatus(order.status)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Design Type</p>
                    <p className="text-sm text-gray-900">{order.design_type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Email</p>
                    <p className="text-sm text-gray-900">{order.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Ordered</p>
                    <p className="text-sm text-gray-900">{formatDate(order.ordered_at)}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Description</p>
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded">{order.description}</p>
                </div>

                {order.rejection_reason && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-red-700 mb-2">Rejection Reason</p>
                    <p className="text-sm text-red-600 bg-red-50 p-3 rounded">{order.rejection_reason}</p>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t">
                  <p className="text-xs text-gray-500">
                    Last updated: {formatDate(order.updated_at || order.ordered_at)}
                  </p>
                  <button
                   onClick={() => viewDetailsHandler(order.id)}
                    className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
             
        {/* Modal for viewing order details */}
        {showModal && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleCloseModal}>
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">{selectedOrder.title}</h3>
                  <p className="text-sm text-gray-600">Order #{selectedOrder.id}</p>
                </div>
                
            
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Status</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${orderHelpers.getStatusColor(selectedOrder.status)}`}>
                      {orderHelpers.formatStatus(selectedOrder.status)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Design Type</p>
                    <p className="text-sm text-gray-900">{selectedOrder.design_type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Ordered</p>
                    <p className="text-sm text-gray-900">{formatDate(selectedOrder.ordered_at)}</p>
                  </div>
                  {selectedOrder.budget && (
                    <div>
                      <p className="text-sm font-medium text-gray-700">Budget</p>
                      <p className="text-sm text-gray-900">${selectedOrder.budget}</p>
                    </div>
                  )}
                </div>
                
              
                <div>
                  <p className="text-sm font-medium text-gray-700">Description</p>
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded">{selectedOrder.brief || selectedOrder.description}</p>
                </div>

                {selectedOrder.rejection_reason && (
                  <div>
                    <p className="text-sm font-medium text-red-700">Rejection Reason</p>
                    <p className="text-sm text-red-600 bg-red-50 p-3 rounded">{selectedOrder.rejection_reason}</p>
                  </div>
                )}

                <div className="flex justify-end pt-4">
                  <button 
                    onClick={handleCloseModal}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )} 
      </div>
    </div>
  );
};

export default GraphicDesignOrdersPage;
