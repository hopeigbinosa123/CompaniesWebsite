from django.db import models
from django.conf import settings


class Designer(models.Model):
    SPECIALITIES = [
        ("THUMBNAIL", "Thumbnail"),
        ("WEB_DESIGN", "Web Design"),
        ("BANNER", "Banner"),  # Fixed typo from BARNER to BANNER
        ("LOGO", "Logo"),
    ]

    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to='designers/')  # Added upload_to
    email = models.EmailField()
    speciality = models.CharField(max_length=50, choices=SPECIALITIES)
    bio = models.TextField()

    def __str__(self):
        return self.name


class Order(models.Model):
    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("APPROVED", "Approved"),
        ("IN_PROGRESS", "In Progress"),
        ("REJECTED", "Rejected"),
        ("COMPLETED", "Completed"),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='design_orders')
    email = models.EmailField()
    title = models.CharField(max_length=200)
    design_type = models.CharField(max_length=200)
    description = models.TextField()
    ordered_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="PENDING")
    rejection_reason = models.TextField(blank=True, null=True)
    reference_files = models.FileField(upload_to='design_references/', blank=True, null=True)  # Added for file uploads

    def __str__(self):
        return f"{self.user.get_full_name() if self.user else 'Unknown User'} - {self.title} ({self.status})"

    def reject(self, reason):
        self.status = "REJECTED"
        self.rejection_reason = reason
        self.save()

    def approve(self):
        self.status = "APPROVED"
        self.rejection_reason = None
        self.save()

    def start_progress(self):
        if self.status == "APPROVED":
            self.status = "IN_PROGRESS"
            self.save()

    def complete(self):
        if self.status == "IN_PROGRESS":
            self.status = "COMPLETED"
            self.save()
