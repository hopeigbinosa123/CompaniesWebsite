from rest_framework import serializers
from .models import SoftwareService, ServiceRequest, ProjectUpdate


class SoftwareServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = SoftwareService
        fields = "__all__"


class ServiceRequestSerializer(serializers.ModelSerializer):
    service_name = serializers.CharField(source="service.name", read_only=True)

    class Meta:
        model = ServiceRequest
        fields = "__all__"
        read_only_fields = ("user", "status", "created_at", "updated_at")


class ServiceRequestUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceRequest
        fields = "__all__"  # Allow all fields to be updated by admin
        read_only_fields = (
            "user",
            "created_at",
            "updated_at",
        )  # User, created_at, updated_at should still be read-only


class ProjectUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectUpdate
        fields = "__all__"
