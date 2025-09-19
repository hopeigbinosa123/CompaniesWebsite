from django.contrib import admin
from .models import (
    SoftwareService,
    ServiceRequest,
    ProjectUpdate,
    SoftwareEnquiry,
    SupportResponse,
)


@admin.register(SoftwareService)
class SoftwareServiceAdmin(admin.ModelAdmin):
    list_display = ["title", "service_type", "base_price", "is_active"]
    list_filter = ["service_type", "is_active"]
    search_fields = ["title", "description"]


@admin.register(ServiceRequest)
class ServiceRequestAdmin(admin.ModelAdmin):
    list_display = ["user", "project_title", "service", "status", "created_at"]
    list_filter = ["status", "created_at"]
    search_fields = ["user__username", "project_title"]


@admin.register(ProjectUpdate)
class ProjectUpdateAdmin(admin.ModelAdmin):
    list_display = ["service_request", "title", "created_at"]
    list_filter = ["created_at"]


from .models import SoftwareEnquiry, SupportResponse


@admin.register(SoftwareEnquiry)
class SoftwareEnquiryAdmin(admin.ModelAdmin):
    list_display = ["problem_title", "user", "status", "submitted_at"]
    list_filter = ["status", "submitted_at"]


@admin.register(SupportResponse)
class SupportResponseAdmin(admin.ModelAdmin):
    pass
