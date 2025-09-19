from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from paypalrestsdk import Payment
from django.conf import settings
import json
from .serializers import PayPalOrderSerializer
from .models import Payment as PaymentRecord, PaymentStatus


class CreatePayPalOrderView(APIView):
    def post(self, request):
        serializer = PayPalOrderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        amount = serializer.validated_data["amount"]
        currency = serializer.validated_data["currency"]
        description = serializer.validated_data.get(
            "description", "Order from OSIJ Platform"
        )
        try:
            payment = Payment(
                {
                    "intent": "sale",
                    "payer": {"payment_method": "paypal"},
                    "transactions": [
                        {
                            "amount": {"total": amount, "currency": currency},
                            "description": description,
                        }
                    ],
                    "redirect_urls": {
                        "return_url": settings.PAYPAL_RETURN_URL,
                        "cancel_url": settings.PAYPAL_CANCEL_URL,
                    },
                }
            )

            if payment.create():
                return Response(payment.to_dict(), status=status.HTTP_200_OK)
            else:
                return Response(payment.error, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class CapturePayPalOrderView(APIView):
    def post(self, request, order_id):
        try:
            payment_id = request.data.get("paymentID")
            payer_id = request.data.get("payerID")

            paypal_payment = Payment.find(
                payment_id
            )  # Renamed to avoid conflict with local Payment model

            if paypal_payment.execute({"payer_id": payer_id}):
                # Payment successful, update your database, fulfill order, etc.
                # Create or update Payment record in your database
                payment_record, created = PaymentRecord.objects.get_or_create(
                    paypalOrder_id=order_id,  # Assuming order_id from URL is the paypalOrder_id
                    defaults={
                        "user": request.user if request.user.is_authenticated else None,
                        "amount": float(paypal_payment.transactions[0].amount.total),
                        "currency": paypal_payment.transactions[0].amount.currency,
                        "status": PaymentStatus.COMPLETED,
                        "payment_details": paypal_payment.to_dict(),
                    },
                )
                if not created:
                    # If payment record already existed, update its status and details
                    payment_record.status = PaymentStatus.COMPLETED
                    payment_record.payment_details = paypal_payment.to_dict()
                    payment_record.save()

                return Response(
                    {
                        "message": "Payment captured successfully!",
                        "payment_id": payment_record.id,
                    },
                    status=status.HTTP_200_OK,
                )
            else:
                # If PayPal execution fails, update payment status to FAILED if a record exists
                payment_record = PaymentRecord.objects.filter(
                    paypalOrder_id=order_id
                ).first()
                if payment_record:
                    payment_record.status = PaymentStatus.FAILED
                    payment_record.payment_details = paypal_payment.error
                    payment_record.save()
                return Response(
                    paypal_payment.error, status=status.HTTP_400_BAD_REQUEST
                )
        except Exception as e:
            # Log the exception for debugging
            import traceback

            traceback.print_exc()
            return Response(
                {
                    "error": "An unexpected error occurred during payment capture.",
                    "detail": str(e),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
