import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PayPalButton from '../components/payment/PayPalButton';

const PaymentPage = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get course data from navigation state
    if (location.state?.course) {
      setCourse(location.state.course);
    } else {
      // If no course data, redirect to courses page
      navigate('/courses');
    }
  }, [location, navigate]);

  const handlePaymentSuccess = (details) => {
    console.log('Payment successful', details);
    setPaymentStatus('success');
    // You can add additional logic here, like updating the order status in your database
  };

  const handlePaymentError = (error) => {
    console.error('Unable to process payment', error);
    setPaymentStatus('error');
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading course information...</p>
        </div>
      </div>
    );
  }

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
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">{course.title}</h3>
            <p className="text-sm text-gray-600">{course.description}</p>
          </div>
          
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700">Order Total:</span>
            <span className="text-lg font-semibold">${course.price} USD</span>
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
              amount={course.price.toString()} 
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
