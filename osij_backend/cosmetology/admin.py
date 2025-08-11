from django.contrib import admin
from cosmetology.models import BeautyService, StylistProfile, AppointmentBooking

# Register your models here.

class BeautyServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'price', 'image')
    search_fields = ('name', 'description')
    ordering = ('-price', 'name')
admin.site.register(BeautyService, BeautyServiceAdmin)

class StylistProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'services', 'availability')
    list_filter = ['availability']
    search_fields = ('name', 'services')
admin.site.register(StylistProfile, StylistProfileAdmin)

class AppointmentBookingAdmin(admin.ModelAdmin):
    list_display = ('name', 'appointment_date', 'booked_at', 'service', 'stylist')
    list_filter = ['booked_at']
admin.site.register(AppointmentBooking, AppointmentBookingAdmin)