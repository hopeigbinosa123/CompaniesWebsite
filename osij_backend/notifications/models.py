# models.py
from django.db import models

class EmailNotification(models.Model):
    subject = models.CharField(max_length=255)
    message = models.TextField()
    recipient_email = models.EmailField()
    sent_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"To: {self.recipient_email} | {self.subject}"


class ContactMessage(models.Model):
    CONTACT_TYPES = [
        ('general', 'General'),
        ('software', 'Software'),
        ('design', 'Design'),
        ('cosmetology', 'Cosmetology'),
    ]
    
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    contact_type = models.CharField(max_length=20, choices=CONTACT_TYPES, default='general')
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.subject}"