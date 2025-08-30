import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';

const PayPalButton = ({ amount, currency, onSuccess, onError }) => {
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [orderID, setOrderID] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Load PayPal script
  useEffect(() => {
    const loadPayPalScript = () => {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}&currency=${currency || 'USD'}`;
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      script.onerror = () => {
        setError('Failed to load PayPal');
        setIsLoading(false);
      };
      document.body.appendChild(script);
    };

    if (!window.paypal) {
      loadPayPalScript();
    } else {
      setScriptLoaded(true);
    }

    return () => {
      document.body.removeChild(document.querySelector('script[src^="https://www.paypal.com/sdk/js?"]'));
    };
  }, [currency]);

  const createOrder = async (data, actions) => {
    try {
      const response = await axios.post('/api/payments/create-order/', {
        amount: amount,
        currency: currency || 'USD'
      });
      setOrderID(response.data.id);
      return response.data.id;
    } catch (err) {
      setError('Failed to create order');
      onError && onError(err);
      throw err;
    }
  };

  const onApprove = async (data, actions) => {
    try {
      const response = await axios.post(`/api/payments/capture-order/${data.orderID}/`);
      setSucceeded(true);
      onSuccess && onSuccess(response.data);
      return response.data;
    } catch (err) {
      setError('Payment failed. Please try again.');
      onError && onError(err);
      throw err;
    }
  };

  if (!scriptLoaded) {
    return <div>Loading payment options...</div>;
  }

  return (
    <div className="paypal-button-container">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}
      
      {succeeded ? (
        <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4">
          <p className="font-bold">Success!</p>
          <p>Your payment was processed successfully.</p>
        </div>
      ) : (
        <PayPalScriptProvider
          options={{
            'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
            currency: currency || 'USD',
            'disable-funding': 'card,paylater',
            'data-sdk-integration-source': 'integrationbuilder_sc'
          }}
        >
          <PayPalButtons
            style={{ layout: 'vertical' }}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={(err) => {
              setError('An error occurred with PayPal');
              onError && onError(err);
            }}
            disabled={isLoading}
          />
        </PayPalScriptProvider>
      )}
    </div>
  );
};

export default PayPalButton;
