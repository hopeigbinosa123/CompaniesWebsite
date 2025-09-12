# graphic_design/models.py
from django.db import models
from django.conf import settings

<<<<<<< HEAD
class Designer(models.Model):
    name = models.CharField(max_length=120)
    bio = models.TextField(blank=True)
    specialties = models.CharField(max_length=255, blank=True)  # e.g., logos, branding
    portfolio_url = models.URLField(blank=True)
    email = models.EmailField(blank=True)
    is_active = models.BooleanField(default=True)
=======

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
>>>>>>> 85c70677a912d112ee4c8ddeb8cbb9bba28816a4

    def __str__(self):
        return self.name


<<<<<<< HEAD
class DesignOrder(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        IN_PROGRESS = "in_progress", "In Progress"
        REVIEW = "review", "In Review"
        COMPLETED = "completed", "Completed"
        CANCELED = "canceled", "Canceled"

    client = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="design_orders")
    designer = models.ForeignKey(Designer, on_delete=models.SET_NULL, null=True, related_name="orders")
    title = models.CharField(max_length=140)
    brief = models.TextField()
    reference_links = models.TextField(blank=True, help_text="Comma-separated URLs or notes")
    budget = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        client_name = getattr(self.client, "username", str(self.client_id))
        return f"{self.title} — {client_name}"
=======
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
>>>>>>> 85c70677a912d112ee4c8ddeb8cbb9bba28816a4
