import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';

const PayPalButton = ({ amount, currency, onSuccess, onError }) => {
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [orderID, setOrderID] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Inject PayPal script
  useEffect(() => {
              const Insert_PayPal_Script = () => {
                const script = document.createElement('script');
                script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}&currency=${currency ?? 'USD'}`;
                script.async = true;
                script.onload = () => setScriptLoaded(true);
                script.onerror = () => {
                  setError('Oops! wecould not load paypal script');
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
                   document.body.removeChild(document.querySelector('script[src^="https://www.paypal.com/sdk/js?"]'));
           };
         }, [currency]);

              const create_Order = async (PaypalData, PaypalActions) => {
               try {
                  const response = await axios.post('/api/payments/create-order/', {
                    amount: amount,
                    currency: currency ?? 'USD'
           });
               setOrderID(response.Paypaldata.id);
               return response.PapalData.id;
             } catch (err) {
               setError('Failed to create order');
               onError?.(err);
              throw err;
            }
           };

              const Handle_Approval = async (PaypalData, PaypalActions) => {
                //Pull in the order from your server to finalize the transaction
                    try {
                        const response = await axios.post(`/api/payments/capture-order/${PaypalData.orderID}/`);
                        setSucceeded(true);
                        onSuccess && onSuccess(response.PaypalData);
                        return response.PaypalData;
                       }catch (err) {
                        setError('Something went wrong while creating you order. Please try again.');
                        onError?.(err);
                        throw err;
                         }
                       };

                    if (!scriptLoaded) {
                       return <div>Hang on tight! We are Loading your payment options...</div>;
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
          <p className="font-bold">SUCCESS!</p>
          <p>Your payment was successfully Processed.</p>
        </div>
      ) : (
        <PayPalScriptProvider
          options={{
            'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
            currency: currency ?? 'USD',
            'disable-funding': 'card,paylater',
            'data-sdk-integration-source': 'integrationbuilder_sc'
          }}
        >
          <PayPalButtons
            style={{ layout: 'vertical' }}
            createOrder={create_Order}
            onApprove={Handle_Approval}
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
