from django.db import models
from django.conf import settings


# Model for the cosmetology services offered
class BeautyService(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to="beauty_images/", null=True, blank=True)


# Model for the stylists profiles and the services they offer, including their available time slots
class StylistProfile(models.Model):
    name = models.CharField(max_length=200)
    services = models.ForeignKey(BeautyService, on_delete=models.CASCADE)
    bio = models.TextField()
    availability = models.DateTimeField()

    def __str__(self):
        return self.name


# Model for booking an appointment, with the required details to make an appointment
class AppointmentBooking(models.Model):
    name = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    service = models.ForeignKey(BeautyService, on_delete=models.CASCADE)
    stylist = models.ForeignKey(StylistProfile, on_delete=models.CASCADE)
    appointment_date = models.DateTimeField()
    booked_at = models.DateTimeField(auto_now_add=True)
