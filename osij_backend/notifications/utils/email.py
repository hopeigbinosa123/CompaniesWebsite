# users/utils/email.py
from django.core.mail import send_mail
from django.conf import settings

def send_welcome_email(user):
    subject = "🎉 Welcome to the platform!"
    message = f"Hi {user.first_name},\n\nThanks for joining us! Your journey starts now."
    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [user.email])