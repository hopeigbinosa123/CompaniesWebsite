from rest_framework import serializers
from .models import BeautyServices, StylistProfile, AppointmentBooking

class BeautyServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = BeautyServices
        fields = '__all__'

class StylistProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StylistProfile
        fields = '__all__'

class AppointmentBookingSerializers(serializers.ModelSerializer):
    class Meta:
        model = AppointmentBooking
        fields = '__all__'