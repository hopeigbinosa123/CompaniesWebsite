# cosmetology/serializers.py
from rest_framework import serializers
<<<<<<< HEAD
from .models import Stylist, Appointment
from django.utils import timezone

class StylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stylist
        fields = "__all__"
=======
from django.contrib.auth import get_user_model
from .models import BeautyService, StylistProfile, AppointmentBooking

User = get_user_model()

# serializer for retrieving all services
class BeautyServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = BeautyService
        fields = ['id', 'name', 'description', 'category', 'price', 'duration', 'is_available']
>>>>>>> 85c70677a912d112ee4c8ddeb8cbb9bba28816a4


class AppointmentSerializer(serializers.ModelSerializer):
    client_username = serializers.CharField(source="client.username", read_only=True)
    stylist_name = serializers.CharField(source="stylist.name", read_only=True)

    class Meta:
        model = Appointment
        fields = [
            "id", "client", "client_username", "stylist", "stylist_name",
            "service", "notes", "start_time", "duration_minutes",
            "status", "created_at", "updated_at",
        ]
        read_only_fields = ("status", "created_at", "updated_at")

<<<<<<< HEAD
    def validate_start_time(self, value):
        if value < timezone.now():
            raise serializers.ValidationError("Start time must be in the future.")
        return value
=======
# serializer for retrieving a list of stylists profiles
class StylistProfileSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    services = serializers.SerializerMethodField()
    
    class Meta:
        model = StylistProfile
        fields = ['id', 'name', 'specialization', 'experience', 'is_available', 'services']
    
    def get_name(self, obj):
        return obj.user.get_full_name() or obj.user.username
    
    def get_services(self, obj):
        # Return a list of service names the stylist can perform
        return [service.name for service in BeautyService.objects.all()]


# serializer for viewing details of a stylist profile on_click
class StylistDetailsSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    
    class Meta:
        model = StylistProfile
        fields = '__all__'
    
    def get_name(self, obj):
        return obj.user.get_full_name() or obj.user.username
    
    def get_email(self, obj):
        return obj.user.email


# serializer for viewing appointments made by the user
class AppointmentBookingSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()
    service_name = serializers.SerializerMethodField()
    stylist_name = serializers.SerializerMethodField()
    
    class Meta:
        model = AppointmentBooking
        fields = '__all__'
        read_only_fields = ['user', 'created_at']
    
    def get_user_name(self, obj):
        return obj.user.get_full_name() or obj.user.username
    
    def get_service_name(self, obj):
        return obj.service.name
    
    def get_stylist_name(self, obj):
        return obj.stylist.user.get_full_name() or obj.stylist.user.username


# serializer for creating appointments
class AppointmentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppointmentBooking
        fields = ['service', 'stylist', 'appointment_date', 'notes']
    
    def create(self, validated_data):
        # Set the user to the currently authenticated user
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
>>>>>>> 85c70677a912d112ee4c8ddeb8cbb9bba28816a4
