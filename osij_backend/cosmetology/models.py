from django.db import models
from django.conf import settings


# Create your models here.

class BeautyService(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='beauty_services/', default='default.jpg')

class StylistProfile(models.Model):
    name = models.CharField(max_length=200)
    services = models.ForeignKey(BeautyService, on_delete=models.CASCADE)
    availability = models.DateTimeField() 
    
    def __str__(self):
        return self.name

class AppointmentBooking(models.Model):
    name = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    service = models.ForeignKey(BeautyService, on_delete=models.CASCADE)
    stylist = models.ForeignKey(StylistProfile, on_delete=models.CASCADE)
    appointment_date = models.DateTimeField()
    booked_at = models.DateTimeField(auto_now_add=True)
    