from django.db import models
from django.conf import settings

class SoftwareService(models.Model):
    SERVICE_TYPES = [
        ('web', 'Web Development'),
        ('mobile', 'Mobile App Development'),
        ('desktop', 'Desktop Software'),
        ('api', 'API Development'),
        ('database', 'Database Design'),
        ('cloud', 'Cloud Services'),
        ('ai', 'AI/ML Solutions'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    service_type = models.CharField(max_length=50, choices=SERVICE_TYPES, default='web')
    base_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    estimated_timeline = models.CharField(max_length=100, default='default timeline')  # e.g., "2-4 weeks"
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.name

class ServiceRequest(models.Model):
    STATUS_CHOICES = [
        ('submitted', 'Submitted'),
        ('reviewing', 'Under Review'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    service = models.ForeignKey(SoftwareService, on_delete=models.CASCADE)
    project_title = models.CharField(max_length=200)
    project_description = models.TextField()
    budget = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    timeline = models.CharField(max_length=100, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='submitted')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.project_title}"

class ProjectUpdate(models.Model):
    service_request = models.ForeignKey(ServiceRequest, on_delete=models.CASCADE, related_name='updates')
    title = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Update for {self.service_request.project_title}"

# Add to software_services/models.py
class SoftwareEnquiry(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=1) # FIXME: Provide a valid default user id
    problem_title = models.CharField(max_length=200)
    problem_description = models.TextField()
    status = models.CharField(max_length=20, default='submitted')
    submitted_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.problem_title}"

class SupportResponse(models.Model):
    enquiry = models.ForeignKey(SoftwareEnquiry, on_delete=models.CASCADE, related_name='responses')
    responder = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Response to {self.enquiry.problem_title}"