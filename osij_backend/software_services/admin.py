from django.contrib import admin
from .models import SoftwareEnquiry, SupportResponse

# Register your models here.
@admin.register(SoftwareEnquiry)
class SoftwareEnquiryAdmin(admin.ModelAdmin):
    list_display = ('user', 'problem_title', 'platform', 'preferred_contact_method', 'status', 'submitted_at')
    search_fields = ('user__username', 'problem_title', 'platform')
    list_filter = ('status', 'preferred_contact_method')

@admin.register(SupportResponse)
class SupportResponseAdmin(admin.ModelAdmin):
    list_display = ('enquiry', 'responder', 'timestamp')
    search_fields = ('responder__username', 'message')
    list_filter = ('timestamp',)
