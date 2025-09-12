# graphic_design/models.py
from django.db import models
from django.conf import settings

class Designer(models.Model):
    name = models.CharField(max_length=120)
    bio = models.TextField(blank=True)
    specialties = models.CharField(max_length=255, blank=True)  # e.g., logos, branding
    portfolio_url = models.URLField(blank=True)
    email = models.EmailField(blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


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
