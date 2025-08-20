from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Designer(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    image = models.ImageField()

    def __str__(self):
        return self.name

class Order(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('APPROVED', 'Approved'),
        ('IN_PROGRESS', 'In Progress'),
        ('REJECTED', 'Rejected'),
        ('COMPLETED', 'Completed'),
    ]

    name = models.ForeignKey(User, on_delete=models.CASCADE)
    email = models.EmailField()
    title = models.CharField(max_length=200)
    design_type = models.CharField(max_length=200)
    description = models.TextField()
    ordered_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    rejection_reason = models.TextField(blank=True, null=True)


    def __str__(self):
        return f"{self.name} - {self.title} ({self.status})"

    def reject(self, reason):
        self.status = 'REJECTED'
        self.rejection_reason = reason
        self.save()

    def approve(self):
        self.status = 'APPROVED'
        self.rejection_reason = None
        self.save()

    def start_progress(self):
        if self.status == 'APPROVED':
            self.status = 'IN_PROGRESS'
            self.save()

    def complete(self):
        if self.status == 'IN_PROGRESS':
            self.status = 'COMPLETED'
            self.save()
