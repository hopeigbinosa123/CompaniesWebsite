from django.contrib import admin

# Register your models here.
from .models import SoftwareEnquiry, SupportResponse  # software_support
admin.site.register(SoftwareEnquiry)
admin.site.register(SupportResponse)