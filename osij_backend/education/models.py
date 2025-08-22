from django.db import models
from django.contrib.auth.models import User
from django.conf import settings



# Create your models here.
class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    instructor = models.CharField(
        max_length=100, default="Unknown Instructor"
    )  # Add default value
    duration = models.IntegerField(help_text="Duration in hours", default=1)
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Enrollment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    enrolled_at = models.DateTimeField(auto_now_add=True)
    paid = models.BooleanField(default=False)
    completed = models.BooleanField(default=False)

    class Meta:
        ordering = ["-enrolled_at"]


class Certificate(models.Model):
    enrollment = models.OneToOneField(Enrollment, on_delete=models.CASCADE)
    download_link = models.URLField(max_length=200)
    issued_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-issued_at"]


class Video(models.Model):
    title = models.CharField(max_length=255)
    url = models.URLField()
    transcript = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title
