import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';

const PayPal_Button = ({ amount, currency, onSuccess, onError }) => {
  //  state variables that handle payment status
         const [error, setError] = useState(null);
         const [succeeded, setSucceeded] = useState(false);
         const [orderID, setOrderID] = useState(false);

  const create_Order = async (data, actions) => {
    
    try {
             const response = await axios.post('/api/payments/create-order/', {
                     amount: amount,
                     currency: currency || 'USD'
                      });
              setOrderID(response.data.id);
              return response.data.id;
       }      catch (err) {
              setError('Failed to create order');
              return '';
    }
  };

  const on_Approval = async (data, actions) => {
    // Approves the payment if is successful or not
    try {
            const response = await axios.post(`/api/payments/capture-order/${data.orderID}/`);
            setSucceeded(true);
            if (onSuccess) onSuccess(response.data);
            return response.data;
    }       catch (err) {
            setError('Payment failed');
            if (onError) onError(err);
    }
  };

  return (
    <div className="paypal-button-container">
      {error && <div className="error-message">{error}</div>}
      {succeeded ? (
        <div className="success-message">Success payment!</div>
      ) : (
        <PayPalScriptProvider
          options={{
            'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
            currency: currency || 'USD'
          }}
        >
          <PayPalButtons
            style={{ layout: 'vertical' }}
            createOrder={create_Order}
            onApprove={on_Approval}
            onError={onError}
          />
        </PayPalScriptProvider>
      )}
    </div>
  );
};

export default PayPal_Button;