from django.contrib import admin
from .models import BeautyServices, StylistProfile, AppointmentBooking

# Register your models here.
admin.site.register(BeautyServices)
admin.site.register(StylistProfile)
admin.site.register(AppointmentBooking)