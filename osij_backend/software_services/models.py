from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class SoftwareEnquiry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    problem_title = models.CharField(max_length=200)
    problem_description = models.TextField()
    platform = models.CharField(max_length=100, blank=True, null=True)
    attachment = models.FileField(upload_to='enquiries/', blank=True, null=True)
    preferred_contact_method = models.CharField(max_length=50, choices=[
        ('email', 'Email'),
        ('phone', 'Phone'),
        ('chat', 'Live Chat')
    ])
    sumbitted_at = models.DateTimeField(auto_now_add=True)

class SupportResponse(models.Model):
    enquiry = models.ForeignKey(SoftwareEnquiry, on_delete=models.CASCADE)
    responder = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)