from django.db import models
from django.conf import settings

class ZoomMeeting(models.Model):
    meeting_type_choices = [
        (1, 'Instant Meeting'),
        (2, 'Scheduled Meeting'),
        (3, 'Recurring Meeting No Fixed Time'),
        (8, 'Recurring Meeting Fixed Time')
    ]
    
    # Zoom meeting details
    meeting_id = models.BigIntegerField(unique=True)
    topic = models.CharField(max_length=200)
    agenda = models.TextField(blank=True)
    start_time = models.DateTimeField()
    duration = models.IntegerField(help_text="Duration in minutes")
    timezone = models.CharField(max_length=50, default='UTC')
    password = models.CharField(max_length=100, blank=True)
    join_url = models.URLField()
    start_url = models.URLField(help_text="Host URL to start meeting")
    
    # Our platform references
    lesson = models.OneToOneField('education.Lesson', on_delete=models.CASCADE, 
                                 related_name='zoom_meeting', null=True, blank=True)
    instructor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
                                  limit_choices_to={'role': 'instructor'})
    
    # Status
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.topic} - {self.start_time}"

class ZoomOAuthToken(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    access_token = models.TextField()
    refresh_token = models.TextField()
    expires_in = models.IntegerField()
    token_type = models.CharField(max_length=50)
    scope = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def is_expired(self):
        from django.utils import timezone
        from datetime import timedelta
        return timezone.now() > self.created_at + timedelta(seconds=self.expires_in - 300)  # 5 min buffer
    
    def __str__(self):
        return f"Zoom Token - {self.user.username}"