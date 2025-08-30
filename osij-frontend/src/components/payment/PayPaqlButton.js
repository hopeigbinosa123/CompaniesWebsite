import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';

const PayPalButton = ({ amount, currency, onSuccess, onError }) => {
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [orderID, setOrderID] = useState(false);

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
      return '';
    }
  };

  const onApprove = async (data, actions) => {
    try {
      const response = await axios.post(`/api/payments/capture-order/${data.orderID}/`);
      setSucceeded(true);
      if (onSuccess) onSuccess(response.data);
      return response.data;
    } catch (err) {
      setError('Payment failed');
      if (onError) onError(err);
    }
  };

  return (
    <div className="paypal-button-container">
      {error && <div className="error-message">{error}</div>}
      {succeeded ? (
        <div className="success-message">Payment successful!</div>
      ) : (
        <PayPalScriptProvider
          options={{
            'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
            currency: currency || 'USD'
          }}
        >
          <PayPalButtons
            style={{ layout: 'vertical' }}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
          />
        </PayPalScriptProvider>
      )}
    </div>
  );
};

export default PayPalButton;