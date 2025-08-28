from rest_framework import serializers
from .models import BeautyService, StylistProfile, AppointmentBooking

# serializer for retrieving all services
class BeautyServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = BeautyService
        fields = ['name', 'price', 'image']


# serializer for viewing a service in details
class BeautyServiceDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BeautyService
        fields = '__all__'

# serializer for retrieving a list of stylists profiles
class StylistProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StylistProfile
        fields = ['name', 'services']


# serializer for viewing details of a stylist profile on_click
class StylistDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = StylistProfile
        fields = '__all__'


# serializer for viewing appointments made by the user
class AppointmentBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppointmentBooking
        fields = '__all__'