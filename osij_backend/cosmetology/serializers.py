# cosmetology/serializers.py
from rest_framework import serializers
from .models import Stylist, Appointment
from django.utils import timezone

class StylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stylist
        fields = "__all__"


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

    def validate_start_time(self, value):
        if value < timezone.now():
            raise serializers.ValidationError("Start time must be in the future.")
        return value
