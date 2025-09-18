from rest_framework import serializers

class PayPalOrderSerializer(serializers.Serializer):
    amount = serializers.DecimalField(max_digits=10, decimal_places=2, required=True)
    currency = serializers.CharField(max_length=3, required=True)
    description = serializers.CharField(max_length=255, required=False, allow_blank=True)
