from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Appointment
from .utils.email import send_appointment_confirmation

@receiver(post_save, sender=Appointment)
def send_appointment_email(sender, instance, created, **kwargs):
    if created:
        send_appointment_confirmation(instance)