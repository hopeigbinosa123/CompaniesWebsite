from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class BeautyServices(models.Model):
    service_name = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    service_image = models.ImageField

class StylistProfile(models.Model):
    name = models.CharField(max_length=200)
    services = models.ForeignKey(BeautyServices, on_delete=models.CASCADE)
    availability = models.DateTimeField()

class AppointmentBooking(models.Model):
    name = models.ForeignKey(User, on_delete=models.CASCADE)
    appointment_date = models.DateTimeField()
    booked_at = models.DateTimeField(auto_now_add=True)
    stylist = models.ForeignKey(StylistProfile)