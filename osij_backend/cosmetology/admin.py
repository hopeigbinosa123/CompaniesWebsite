from django.contrib import admin
from .models import BeautyService, StylistProfile, AppointmentBooking

@admin.register(BeautyService)
class BeautyServiceAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'duration', 'is_available']
    list_filter = ['category', 'is_available', 'price']
    search_fields = ['name', 'description']

@admin.register(StylistProfile)
class StylistProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'specialization', 'experience', 'is_available']
    list_filter = ['specialization', 'is_available']
    search_fields = ['user__username', 'specialization']

@admin.register(AppointmentBooking)
class AppointmentBookingAdmin(admin.ModelAdmin):
    list_display = ['user', 'service', 'stylist', 'appointment_date', 'status']
    list_filter = ['status', 'appointment_date']
    search_fields = ['user__username', 'service__name', 'stylist__user__username']