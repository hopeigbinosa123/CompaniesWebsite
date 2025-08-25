from django.db import models
from django.conf import settings

# Create your models here.


# Model for the structure of the graphic designer's profile, including the designer's specialities
class Designer(models.Model):
    SPECIALITIES = [
        ("THUMBNAIL", "Thumbnail"),
        ("WEB_DESIGN", "Web Design"),
        ("BARNER", "Barner"),
        ("LOGO", "Logo"),
    ]

    name = models.CharField(max_length=200)
    image = models.ImageField()
    email = models.EmailField()
    speciality = models.CharField(max_length=50, choices=SPECIALITIES)
    bio = models.TextField()

    def __str__(self):
        return self.name


# model for graphic design orders made by users with the order requirements and status tracking
class Order(models.Model):
    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("APPROVED", "Approved"),
        ("IN_PROGRESS", "In Progress"),
        ("REJECTED", "Rejected"),
        ("COMPLETED", "Completed"),
    ]

    name = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    email = models.EmailField()
    title = models.CharField(max_length=200)
    design_type = models.CharField(max_length=200)
    description = models.TextField()
    ordered_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="PENDING")
    rejection_reason = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} - {self.title} ({self.status})"

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
