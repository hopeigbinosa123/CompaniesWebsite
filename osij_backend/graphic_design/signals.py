from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import DesignOrder
from .utils.email import send_design_order_confirmation

@receiver(post_save, sender=DesignOrder)
def send_order_email(sender, instance, created, **kwargs):
    if created:
        send_design_order_confirmation(instance)