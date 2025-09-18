from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from education.models import Enrollment
# Temporarily comment out the email imports
# from .email_sender import send_welcome_email, send_enrollment_confirmation_email

User = get_user_model()

@receiver(post_save, sender=User)
def send_email_on_registration(sender, instance, created, **kwargs):
    if created:
        print("User created. Email sending is temporarily disabled.")
        # Temporarily disabled:
        # send_welcome_email(instance)
        pass

@receiver(post_save, sender=Enrollment)
def send_email_on_enrollment(sender, instance, created, **kwargs):
    if created:
        # Temporarily disabled:
        # send_enrollment_confirmation_email(instance)
        pass