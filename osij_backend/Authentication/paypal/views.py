
from django.urls import reverse
from django.shortcuts import render
from django.http import JsonResponse

def payment_view(request):
    #what you want the button to do.
    paypal_dict = {
        "business": "receiver_email@gmail.com",  # Replace with your PayPal email
        "amount": "10.00",  # Amount to be charged  
        "item_name": "My Product",
        "invoice": "unique_invoice_id",  # Unique invoice ID
        "notify_url": request.build_absolute_uri(reverse('paypal-ipn')),
        "return_url": request.build_absolute_uri(reverse('payment_success')),
        "cancel_return": request.build_absolute_uri(reverse('payment_cancel')),
        "custom": "premium_plan",  # Custom data to pass
    }
    return JsonResponse({paypal_dict: paypal_dict})
