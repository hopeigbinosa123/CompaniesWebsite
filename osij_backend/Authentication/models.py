from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.

class User(AbstractUser):
    email = models.EmailField(_('email address'), unique=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    
    # Add custom fields here if required
    
    class Meta:
        swappable = 'AUTH_USER_MODEL'
        
    def __str__(self):
        return self.email
