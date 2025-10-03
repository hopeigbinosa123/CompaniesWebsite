from rest_framework import serializers
from django.utils import timezone
from django.contrib.auth import get_user_model
from .models import BeautyService, StylistProfile, Appointment, AppointmentBooking

User = get_user_model()


# Serializer for stylist profile list
class StylistProfileSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()
    services = serializers.SerializerMethodField()

    class Meta:
        model = StylistProfile
        fields = [
            "id",
            "name",
            "username",
            "specialization",
            "experience",
            "is_available",
            "services",
        ]

    def get_name(self, obj):
        return obj.user.get_full_name() or obj.user.username

    def get_username(self, obj):
        return obj.user.username

    def get_services(self, obj):
        return [service.name for service in BeautyService.objects.all()]


# Serializer for stylist profile detail
class StylistDetailsSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()

    class Meta:
        model = StylistProfile
        fields = "__all__"

    def get_name(self, obj):
        return obj.user.get_full_name() or obj.user.username

    def get_email(self, obj):
        return obj.user.email


# Serializer for beauty services
class BeautyServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = BeautyService
        fields = ["id", "name", "description", "price", "duration_minutes"]


# Serializer for appointments
class AppointmentSerializer(serializers.ModelSerializer):
    client_username = serializers.CharField(source="client.username", read_only=True)
    stylist_name = serializers.CharField(source="stylist.user.username", read_only=True)

    class Meta:
        model = Appointment
        fields = [
            "id",
            "client",
            "client_username",
            "stylist",
            "stylist_name",
            "service",
            "notes",
            "appointment_date",
            "status",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ("status", "created_at", "updated_at")

    def validate_appointment_date(self, value):
        if value < timezone.now().date():
            raise serializers.ValidationError("Appointment date must be in the future.")
        return value


# Serializer for viewing user's bookings
class AppointmentBookingSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()
    service_name = serializers.SerializerMethodField()
    stylist_name = serializers.SerializerMethodField()

    class Meta:
        model = AppointmentBooking
        fields = [
            'id',
            'user',
            'user_name',
            'service',
            'service_name',
            'stylist',
            'stylist_name',
            'appointment_date',
            'status',
            'notes',
        ]
        read_only_fields = ["user"]

    def get_user_name(self, obj):
        return obj.user.get_full_name() or obj.user.username

    def get_service_name(self, obj):
        return obj.service.name

    def get_stylist_name(self, obj):
        return obj.stylist.user.get_full_name() or obj.stylist.user.username


from datetime import datetime


# Serializer for creating bookings
class AppointmentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppointmentBooking
        fields = ["service", "stylist", "appointment_date", "notes"]

    def validate_appointment_date(self, value):
        if isinstance(value, datetime):
            return value.date()
        return value

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)
