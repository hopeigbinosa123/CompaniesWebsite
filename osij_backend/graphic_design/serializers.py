# graphic_design/serializers.py
from rest_framework import serializers
from .models import Designer, DesignOrder


class DesignerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Designer
        fields = "__all__"


class DesignOrderSerializer(serializers.ModelSerializer):
    client_username = serializers.CharField(source="client.username", read_only=True)
    designer_name = serializers.CharField(source="designer.name", read_only=True)

    class Meta:
        model = DesignOrder
        fields = [
            "id",
            "client",
            "client_username",
            "designer",
            "designer_name",
            "title",
            "brief",
            "reference_links",
            "budget",
            "status",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ("status", "created_at", "updated_at")

    def validate(self, attrs):
        # Example: require budget for certain briefs (optional)
        return attrs
