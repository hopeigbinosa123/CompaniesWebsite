# utils/email_sender.py
from django.core.mail import send_mail
from django.conf import settings

def send_custom_email(subject, message, recipient_email):
    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [recipient_email],
        fail_silently=False,
    )

def send_bulk_email(subject, message, recipient_list):
    for email in recipient_list:
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [email],
            fail_silently=False,
        )
