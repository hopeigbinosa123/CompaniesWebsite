from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from paypalcheckoutsdk.core import PayPalHttpClient, SandboxEnvironment
from paypalcheckoutsdk.orders import OrdersCreateRequest, OrdersCaptureRequest
from paypalhttp import HttpError
from .models import Payment
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
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            data = request.data
            amount = data.get('amount')
            currency = data.get('currency', 'USD')
            
            if not amount:
                return Response(
                    {"error": "Amount is required"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
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
            
            # Save the payment record
            Payment.objects.create(
                user=request.user,
                amount=amount,
                currency=currency,
                paypal_order_id=response.result.id,
                payment_details=response.result.dict(),
                status='pending'
            )
            
            return Response(response.result.dict(), status=status.HTTP_201_CREATED)
            
        except HttpError as e:
            error_data = json.loads(e.message)
            return Response(
                {"error": error_data.get("details", [{"description": "Payment processing failed"}])},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

class CapturePayPalOrder(APIView, PayPalClient):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, order_id):
        try:
            # Get the payment record
            try:
                payment = Payment.objects.get(paypal_order_id=order_id, user=request.user)
            except Payment.DoesNotExist:
                return Response(
                    {"error": "Payment not found"},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            # Process the capture
            request = OrdersCaptureRequest(order_id)
            response = self.client.execute(request)
            
            # Update payment status
            payment.status = 'completed'
            payment.payment_details = response.result.dict()
            payment.save()
            
            # Here you can add additional logic like sending confirmation emails, etc.
            
            return Response(response.result.dict(), status=status.HTTP_200_OK)
            
        except HttpError as e:
            error_data = json.loads(e.message)
            
            # Update payment status to failed
            if 'payment' in locals():
                payment.status = 'failed'
                payment.save()
            
            return Response(
                {"error": error_data.get("details", [{"description": "Payment capture failed"}])},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )