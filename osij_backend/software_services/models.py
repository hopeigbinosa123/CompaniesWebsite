from django.db import models
from django.contrib.auth.models import User
from django.contrib import admin
from django.conf import settings


# Create your models here.

STATUS_CHOICES = [
    ("open", "Open"),
    ("in_progress", "In Progress"),
    ("resolved", "Resolved"),
    ("closed", "Closed"),
]


class SoftwareEnquiry(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    problem_title = models.CharField(max_length=200)
    problem_description = models.TextField()
    platform = models.CharField(max_length=100, blank=True, null=True)
    attachment = models.FileField(upload_to="enquiries/", blank=True, null=True)
    preferred_contact_method = models.CharField(
        max_length=50,
        choices=[("email", "Email"), ("phone", "Phone"), ("chat", "Live Chat")],
    )
    submitted_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="open")


class SupportResponse(models.Model):
    enquiry = models.ForeignKey(SoftwareEnquiry, on_delete=models.CASCADE)
    responder = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)


class SoftwareEnquiryAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "problem_title",
        "platform",
        "preferred_contact_method",
        "status",
        "submitted_at",
    )
    list_filter = ("status", "preferred_contact_method")

from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class SoftwareService(models.Model):
    SERVICE_CATEGORIES = [
        ('web', 'Web Development'),
        ('mobile', 'Mobile Development'),
        ('api', 'API Development'),
        ('database', 'Database Design'),
        ('cloud', 'Cloud Services'),
        ('ai', 'AI/ML Solutions'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=SERVICE_CATEGORIES)
    icon = models.CharField(max_length=50, default='💻')  # Emoji or icon class
    price_range = models.CharField(max_length=100, blank=True)  # e.g., "$500-$2000"
    duration = models.CharField(max_length=100, blank=True)  # e.g., "2-4 weeks"
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['title']