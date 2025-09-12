# cosmetology/admin.py
from django.contrib import admin
from .models import Stylist, Appointment

@admin.register(Stylist)
class StylistAdmin(admin.ModelAdmin):
    list_display = ("name", "specialties", "is_active")
    list_filter = ("is_active",)
    search_fields = ("name", "specialties", "email")

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ("service", "client", "stylist", "start_time", "status")
    list_filter = ("status", "start_time")
    search_fields = ("service", "notes")
    autocomplete_fields = ("client", "stylist")
