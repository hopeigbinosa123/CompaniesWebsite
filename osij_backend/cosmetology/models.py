from django.db import models
from django.conf import settings

class BeautyService(models.Model):
    SERVICE_CATEGORIES = [
        ('hair', 'Hair Services'),
        ('skin', 'Skincare'),
        ('makeup', 'Makeup'),
        ('spa', 'Spa Treatments'),
        ('nails', 'Nail Services'),
    ]
    
    name = models.CharField(max_length=100)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=SERVICE_CATEGORIES, default='hair')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.IntegerField(help_text="Duration in minutes")
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class StylistProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    specialization = models.CharField(max_length=200)
    experience = models.IntegerField(help_text="Years of experience")
    is_available = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.specialization}"

class AppointmentBooking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    service = models.ForeignKey(BeautyService, on_delete=models.CASCADE)
    stylist = models.ForeignKey(StylistProfile, on_delete=models.CASCADE)
    appointment_date = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.service.name} - {self.appointment_date}"