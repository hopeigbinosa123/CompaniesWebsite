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
import logging

logger = logging.getLogger(__name__)
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
       
            paypal_data = request.data
            amount = paypal_data.get('amount')
            currency = paypal_data.get('currency', 'USD')
            logger.info(f"[CreatePayPalOrder] User: {request.user.id} activate order with Amount: {amount}, Currency: {currency}")

            if not amount:
                logger.warning(f"[CreatePayPalOrder] User: {request.user.id} tried to create order without amount")
                return Response(
                    {"error": "Amount is needed to create an order"},
                    status=status.HTTP_400_BAD_REQUEST
                )
                
            try:
                paypal_request = OrdersCreateRequest()
                paypal_request.prefer('return=representation')
                paypal_request.request_body({
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
            
                response = self.client.execute(paypal_request)
            
            # Save the payment record
                Payment.objects.create(
                     user=request.user,
                     amount=amount,
                     currency=currency,
                     paypal_order_id=response.result.id,
                     payment_details=response.result.dict(),
                    status='pending'
            )
                logger.info(f"[CreatePayPalOrder] User: {request.user.id} successfully created an order {response.result.id}") 
                return Response(response.result.dict(), status=status.HTTP_201_CREATED)
                
            except HttpError as e:
                 error_data = json.loads(e.message)
                 logger.error(f"[CreatePayPalOrder] PayPal HttpError for  user {request.user.id}: {error_data}")
                 return Response(
                {"error": error_data.get("details", [{"description": "Unable to proccess payment because failed"}])},
                status=status.HTTP_400_BAD_REQUEST
            )
            except Exception as e:
                 logger.exception(f"[CreatePayPalOrder] Unexpected error for user {request.user.id}: {str(e)}")
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
                logger.info(f"[CapturePayPalOrder] user {request.user.id} trying to capture order {order_id}")
                payment = Payment.objects.get(paypal_order_id=order_id, user=request.user)
            except Payment.DoesNotExist:
                return Response(
                    {"error": "Payment was not found"},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            # Process the capture
            capture_request = OrdersCaptureRequest(order_id)
            response = self.client.execute(capture_request)
            
            # Update payment status
            payment.status = 'completed'
            payment.payment_details = response.result.dict()
            payment.save()
            
            # Here you can add additional logic like sending confirmation emails, etc.
            logger.info(f"[CapturePayPalOrder] Payment captured successfully for order {order_id}")
            return Response(response.result.dict(), status=status.HTTP_200_OK)
            
        except HttpError as e:
            error_data = json.loads(e.message)
            
            # Update payment status to failed
            if 'payment' in locals():
                payment.status = 'failed'
                payment.save()
            logger.warning(f"[CapturePayPalOrder] Payment was not found for user {request.user.id} and order {order_id}")
            logger.error(f"[CapturePayPalOrder] PayPal HttpError during capture for user {request.user.id}: {error_data}")
            return Response(
                {"error": error_data.get("details", [{"description": "Unable to capture Payment"}])},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            logger.exception(f"[CapturePayPalOrder] unexpected error for user  {request.user.id}: {str(e)}")
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )