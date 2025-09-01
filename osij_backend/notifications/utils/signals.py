# users/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from . import send_welcome_email

User = get_user_model()

@receiver(post_save, sender=User)
def send_email_on_registration(sender, instance, created, **kwargs):
    if created:
        send_welcome_email(instance)
