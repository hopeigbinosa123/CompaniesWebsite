from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.conf import settings


class PaymentStatus(models.TextChoices):
    PENDING = 'pending', 'Pending'
    COMPLETED = 'completed', 'Completed'
    FAILED = 'failed', 'Failed'
    REFUNDED = 'refunded', 'Refunded'
class Payment(models.Model):
    PAYMENT_STATUS = (
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='USD')
    paypalOrder_id = models.CharField(max_length=100, unique=True) # PayPal Order ID
    status = models.CharField(max_length=20, choices=PaymentStatus.choices, default=PaymentStatus.PENDING)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated= models.DateTimeField(auto_now=True)
    payment_details = models.JSONField(default=dict, blank=True)
    
    
    
    def is_Sucess(self):
        return self.status == PaymentStatus.COMPLETED
    
    def mark_as_refunded(self):
        self.status = PaymentStatus.REFUNDED
        self.save(update_fields=['status', 'date_updated'])

    def __str__(self):
        userDisplay= self.user.username if self.user else "Anonymouse"
        return f"{userDisplay} : {self.paypalOrder_id} - {self.amount} {self.currency} ({self.status})"
    