# users/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from education.models import Enrollment # Import Enrollment model
from .email_sender import send_welcome_email, send_enrollment_confirmation_email # Update import

User = get_user_model()

@receiver(post_save, sender=User)
def send_email_on_registration(sender, instance, created, **kwargs):
    if created:
        send_welcome_email(instance)

@receiver(post_save, sender=Enrollment)
def send_email_on_enrollment(sender, instance, created, **kwargs):
    if created:
        send_enrollment_confirmation_email(instance)