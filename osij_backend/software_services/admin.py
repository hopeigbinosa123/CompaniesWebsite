from django.contrib import admin
from .models import SoftwareService, ServiceRequest, ProjectUpdate  # Import what ACTUALLY exists

@admin.register(SoftwareService)
class SoftwareServiceAdmin(admin.ModelAdmin):
    list_display = ['title', 'service_type', 'base_price', 'is_active']
    list_filter = ['service_type', 'is_active']
    search_fields = ['title', 'description']

@admin.register(ServiceRequest)
class ServiceRequestAdmin(admin.ModelAdmin):
    list_display = ['user', 'project_title', 'service', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['user__username', 'project_title']

@admin.register(ProjectUpdate)
class ProjectUpdateAdmin(admin.ModelAdmin):
    list_display = ['service_request', 'title', 'created_at']
    list_filter = ['created_at']

# REMOVE THESE LINES - these models don't exist yet!
# from .models import SoftwareEnquiry, SupportResponse
# @admin.register(SoftwareEnquiry)
# class SoftwareEnquiryAdmin(admin.ModelAdmin):
#     pass
# 
# @admin.register(SupportResponse)
# class SupportResponseAdmin(admin.ModelAdmin):
#     pass