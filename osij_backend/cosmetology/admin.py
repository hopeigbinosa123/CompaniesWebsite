from django.contrib import admin
from .models import StylistProfile, Appointment, BeautyService, AppointmentBooking

@admin.register(StylistProfile)
class StylistProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "specialization", "experience", "is_available")
    search_fields = ["user__username", "specialization"]

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ("service", "client", "stylist", "appointment_date", "status")
    list_filter = ("status", "appointment_date")
    search_fields = ("service__name", "notes")
    autocomplete_fields = ("client", "stylist")

@admin.register(BeautyService)
class BeautyServiceAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "duration_minutes")

@admin.register(AppointmentBooking)
class AppointmentBookingAdmin(admin.ModelAdmin):
    list_display = ("user", "service", "stylist", "appointment_date", "status")
