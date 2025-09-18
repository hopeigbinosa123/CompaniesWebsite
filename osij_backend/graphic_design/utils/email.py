from django.core.mail import send_mail
from django.conf import settings

def send_design_order_confirmation(order):
    subject = f"✅ Design Order Confirmation — {order.title}"
    message = (
        f"Hi {order.client.first_name},\n\n"
        f"Thank you for your order with {order.designer.name}.\n"
        f"Order Details:\n"
        f"- Title: {order.title}\n"
        f"- Status: {order.status}\n"
        f"- Brief: {order.brief}\n\n"
        "We’ll keep you updated as your designer begins work.\n\n"
        "Best,\nThe OSIJ Team"
    )
    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [order.client.email])
