import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PayPalButton from '../components/payment/PayPalButton';

const PaymentPage = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const navigate = useNavigate();

  const handlePaymentSuccess = (details) => {
    console.log('Payment successful', details);
    setPaymentStatus('success');
    // You can add additional logic here, like updating the order status in your database
  };

  const handlePaymentError = (error) => {
    console.error('Payment error', error);
    setPaymentStatus('error');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Complete Your Payment</h2>
          <p className="mt-2 text-sm text-gray-600">
            Secure payment processed through PayPal
          </p>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700">Order Total:</span>
            <span className="text-lg font-semibold">$10.00 USD</span>
          </div>
        </div>

        {paymentStatus === 'success' ? (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
            <p>Payment successful! Thank you for your purchase.</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="mt-2 text-green-700 hover:text-green-800 font-medium"
            >
              Return to Dashboard →
            </button>
          </div>
        ) : paymentStatus === 'error' ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            <p>There was an error processing your payment. Please try again.</p>
            <button
              onClick={() => setPaymentStatus(null)}
              className="mt-2 text-red-700 hover:text-red-800 font-medium"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="mt-8">
            <PayPalButton 
              amount="10.00" 
              currency="USD" 
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
