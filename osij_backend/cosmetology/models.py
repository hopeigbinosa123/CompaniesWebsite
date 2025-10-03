from django.db import models
from django.conf import settings


class StylistProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    specialization = models.CharField(max_length=200)
    experience = models.IntegerField(help_text="Years of experience")
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user.get_full_name()} - {self.specialization}"


class BeautyService(models.Model):
    name = models.CharField(max_length=140)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    duration_minutes = models.PositiveIntegerField(default=60)
    is_available = models.BooleanField(default=True)  # ✅ Add this line

    def __str__(self):
        return f"{self.name} (${self.price})"


class Appointment(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        CONFIRMED = "confirmed", "Confirmed"
        COMPLETED = "completed", "Completed"
        CANCELED = "canceled", "Canceled"

    client = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="appointments"
    )
    stylist = models.ForeignKey(
        StylistProfile,
        on_delete=models.SET_NULL,
        null=True,
        related_name="appointments",
    )
    service = models.ForeignKey(BeautyService, on_delete=models.CASCADE)
    appointment_date = models.DateTimeField()
    notes = models.TextField(blank=True)
    duration_minutes = models.PositiveIntegerField(default=60)
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.PENDING
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-appointment_date"]

    def __str__(self):
        client_name = getattr(self.client, "username", str(self.client_id))
        return f"{self.service.name} — {client_name} @ {self.appointment_date}"


class AppointmentBooking(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("confirmed", "Confirmed"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    service = models.ForeignKey(BeautyService, on_delete=models.CASCADE)
    stylist = models.ForeignKey(StylistProfile, on_delete=models.CASCADE)
    appointment_date = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} - {self.service.name} @ {self.appointment_date}"
