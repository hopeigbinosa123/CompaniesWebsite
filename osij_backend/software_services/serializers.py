from rest_framework import serializers
from .models import SoftwareEnquiry, SupportResponse

class SoftwareEnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = SoftwareEnquiry
        fields = "__all__"

class SupportResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupportResponse
        fields = "__all__"