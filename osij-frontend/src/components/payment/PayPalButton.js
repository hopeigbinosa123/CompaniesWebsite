import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';

const PayPalButton = ({ amount, currency, onSuccess, onError }) => {
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [orderID, setOrderID] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Check if PayPal client ID is configured
  const paypalClientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;

  // Inject PayPal script
  useEffect(() => {
    if (!paypalClientId) {
      setError('PayPal client ID is not configured. Please add REACT_APP_PAYPAL_CLIENT_ID to your environment variables.');
      setIsLoading(false);
      return;
    }

    const Insert_PayPal_Script = () => {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}&currency=${currency ?? 'USD'}`;
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      script.onerror = () => {
        setError('Oops! We could not load PayPal script');
        setIsLoading(false);
      };
      document.body.appendChild(script);
    };

    if (!window.paypal) {
      Insert_PayPal_Script();
    } else {
      setScriptLoaded(true);
    }

    return () => {
      const paypalScript = document.querySelector('script[src^="https://www.paypal.com/sdk/js?"]');
      if (paypalScript) {
        document.body.removeChild(paypalScript);
      }
    };
  }, [currency, paypalClientId]);

  const create_Order = async (PaypalData, PaypalActions) => {
    try {
      const response = await axios.post('/api/payments/create-order/', {
        amount: amount,
        currency: currency ?? 'USD'
      });
      setOrderID(response.data.id);
      return response.data.id;
    } catch (err) {
      setError('Failed to create order');
      onError?.(err);
      throw err;
    }
  };

  const on_Approve = async (PaypalData, PaypalActions) => {
    try {
      const response = await axios.post(`/api/payments/capture-order/${PaypalData.orderID}/`);
      setSucceeded(true);
      onSuccess?.(response.data);
    } catch (err) {
      setError('Failed to capture payment');
      onError?.(err);
      throw err;
    }
  };

  // Show configuration error if client ID is missing
  if (!paypalClientId) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        <h3 className="font-semibold mb-2">Configuration Error</h3>
        <p className="text-sm mb-3">PayPal client ID is not configured. Please add the following to your environment variables:</p>
        <div className="bg-gray-100 p-2 rounded font-mono text-xs">
          REACT_APP_PAYPAL_CLIENT_ID=your_paypal_client_id_here
        </div>
        <p className="text-xs mt-2">You can get your PayPal client ID from the <a href="https://developer.paypal.com/developer/applications/" target="_blank" rel="noopener noreferrer" className="underline">PayPal Developer Dashboard</a>.</p>
      </div>
    );
  }

  // Show loading state
  if (isLoading || !scriptLoaded) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading PayPal...</span>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 text-red-700 hover:text-red-800 underline text-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Show success state
  if (succeeded) {
    return (
      <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
        <p>Payment successful! Thank you for your purchase.</p>
      </div>
    );
  }

  // Show PayPal buttons
  return (
    <PayPalScriptProvider options={{ 
      "client-id": paypalClientId,
      currency: currency || "USD"
    }}>
      <PayPalButtons
        createOrder={(data, actions) => create_Order(data, actions)}
        onApprove={(data, actions) => on_Approve(data, actions)}
        onError={(err) => {
          setError('PayPal payment failed');
          onError?.(err);
        }}
        style={{
          layout: "vertical",
          color: "blue",
          shape: "rect",
          label: "pay"
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
