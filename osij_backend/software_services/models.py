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
