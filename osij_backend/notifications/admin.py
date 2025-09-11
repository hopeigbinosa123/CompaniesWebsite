from django.contrib import admin
from .models import ContactMessage, EmailNotification

# Register your models here.

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'contact_type', 'created_at', 'is_read']
    list_filter = ['contact_type', 'is_read', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    readonly_fields = ['created_at']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Contact Information', {
            'fields': ('name', 'email', 'contact_type')
        }),
        ('Message', {
            'fields': ('subject', 'message')
        }),
        ('Status', {
            'fields': ('is_read', 'created_at')
        }),
    )


@admin.register(EmailNotification)
class EmailNotificationAdmin(admin.ModelAdmin):
    list_display = ['subject', 'recipient_email', 'sent_at']
    search_fields = ['subject', 'recipient_email', 'message']
    readonly_fields = ['sent_at']
    ordering = ['-sent_at']
