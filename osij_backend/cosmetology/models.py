# cosmetology/models.py
from django.db import models
from django.conf import settings

class Stylist(models.Model):
    name = models.CharField(max_length=120)
    bio = models.TextField(blank=True)
    specialties = models.CharField(max_length=255, blank=True)  # e.g., hair, nails, skincare
    email = models.EmailField(blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Appointment(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        CONFIRMED = "confirmed", "Confirmed"
        COMPLETED = "completed", "Completed"
        CANCELED = "canceled", "Canceled"

    client = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="appointments")
    stylist = models.ForeignKey(Stylist, on_delete=models.SET_NULL, null=True, related_name="appointments")
    service = models.CharField(max_length=140)
    notes = models.TextField(blank=True)
    start_time = models.DateTimeField()
    duration_minutes = models.PositiveIntegerField(default=60)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-start_time"]

    def __str__(self):
        client_name = getattr(self.client, "username", str(self.client_id))
        return f"{self.service} — {client_name} @ {self.start_time}"
