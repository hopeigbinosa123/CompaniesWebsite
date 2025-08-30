from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from paypalcheckoutsdk.core import PayPalHttpClient, SandboxEnvironment
from paypalcheckoutsdk.orders import OrdersCreateRequest, OrdersCaptureRequest
from paypalhttp import HttpError
import os
import json


# PayPal client setup
class PayPalClient:
    def __init__(self):
        self.client_id = os.getenv('PAYPAL_CLIENT_ID', '')
        self.client_secret = os.getenv('PAYPAL_SECRET', '')
        
        # Set up PayPal environment (Sandbox for development)
        self.environment = SandboxEnvironment(
            client_id=self.client_id, 
            client_secret=self.client_secret
        )
        self.client = PayPalHttpClient(self.environment)
        
class CreatePayPalOrder(APIView, PayPalClient):
    def post(self, request):
        try:
            data = request.data
            amount = data.get('amount')
            currency = data.get('currency', 'USD')
            
            request = OrdersCreateRequest()
            request.prefer('return=representation')
            request.request_body({
                "intent": "CAPTURE",
                "purchase_units": [{
                    "amount": {
                        "currency_code": currency,
                        "value": str(amount)
                    }
                }],
                "application_context": {
                    "return_url": "http://localhost:3000/payment/success",
                    "cancel_url": "http://localhost:3000/payment/cancel"
                }
            })
            
            response = self.client.execute(request)
            return Response(response.result.dict(), status=status.HTTP_201_CREATED)
            
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )


class CapturePayPalOrder(APIView, PayPalClient):
    def post(self, request, order_id):
        try:
            request = OrdersCaptureRequest(order_id)
            response = self.client.execute(request)
            
            # Here you would typically save the payment details to your database
            # and update the order status
            
            return Response(response.result.dict(), status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )