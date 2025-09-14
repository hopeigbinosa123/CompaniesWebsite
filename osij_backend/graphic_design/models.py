from django.db import models
from django.conf import settings

class Designer(models.Model):
    SPECIALITIES = [
        ("THUMBNAIL", "Thumbnail"),
        ("WEB_DESIGN", "Web Design"),
        ("BANNER", "Banner"),
        ("LOGO", "Logo"),
    ]

    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to='designers/', blank=True, null=True)
    email = models.EmailField()
    speciality = models.CharField(max_length=50, choices=SPECIALITIES)
    bio = models.TextField(blank=True)
    portfolio_url = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Portfolio(models.Model):
    designer = models.ForeignKey(Designer, on_delete=models.CASCADE, related_name="portfolios")
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to="portfolio/")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class DesignService(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    duration_minutes = models.PositiveIntegerField()

    def __str__(self):
        return self.name


class DesignOrder(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        IN_PROGRESS = "in_progress", "In Progress"
        REVIEW = "review", "In Review"
        COMPLETED = "completed", "Completed"
        CANCELED = "canceled", "Canceled"


    client = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name="design_orders")
    designer = models.ForeignKey(Designer, on_delete=models.SET_NULL, null=True, related_name="orders")
    title = models.CharField(max_length=140)
    brief = models.TextField()
    reference_links = models.TextField(blank=True, help_text="Comma-separated URLs or notes")
    reference_files = models.FileField(upload_to='design_references/', blank=True, null=True)
    budget = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    rejection_reason = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        client_name = getattr(self.client, "username", str(self.client_id))
        return f"{self.title} — {client_name}"

    def reject(self, reason):
        self.status = self.Status.CANCELED
        self.rejection_reason = reason
        self.save()

    def approve(self):
        self.status = self.Status.IN_PROGRESS
        self.rejection_reason = None
        self.save()

    def complete(self):
        self.status = self.Status.COMPLETED
        self.save()
