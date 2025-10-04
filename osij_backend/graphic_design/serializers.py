# graphic_design/serializers.py
from rest_framework import serializers
from .models import Designer, DesignOrder, Portfolio, DesignService

class PortfolioSerializer(serializers.ModelSerializer):
    designer_name = serializers.CharField(source="designer.name", read_only=True)
    
    class Meta:
        model = Portfolio
        fields = ["id", "designer", "designer_name", "title", "image", "created_at"]
        
class DesignerSerializer(serializers.ModelSerializer):
    portfolios = PortfolioSerializer(many=True, read_only=True)
    class Meta:
        model = Designer
        fields = "__all__"





class DesignServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = DesignService
        fields = ["id", "name", "description", "price", "duration_minutes"]


class DesignOrderSerializer(serializers.ModelSerializer):
    client_username = serializers.CharField(source="client.username", read_only=True)
    designer_name = serializers.CharField(source="designer.name", read_only=True)
    
    # Add email field from client
    email = serializers.EmailField(source="client.email", read_only=True)
    
    # Add aliases for frontend compatibility
    description = serializers.CharField(source="brief", required=False)
    ordered_at = serializers.DateTimeField(source="created_at", read_only=True)
    design_type = serializers.CharField(source="designer.speciality", read_only=True)

    class Meta:
        model = DesignOrder
        fields = [
            "id",
            "client",
            "client_username",
            "email",
            "designer",
            "designer_name",
            "design_type",
            "title",
            "brief",
            "description",  # Alias for brief
            "reference_links",
            "reference_files",
            "budget",
            "status",
            "rejection_reason",
            "created_at",
            "ordered_at",  # Alias for created_at
            "updated_at",
        ]
        read_only_fields = ("status", "created_at", "updated_at", "rejection_reason")

    def validate(self, attrs):
        # Handle the description alias - map it to brief
        if 'brief' in attrs and 'description' not in attrs:
            # brief is already set, no need to do anything
            pass
        return attrs