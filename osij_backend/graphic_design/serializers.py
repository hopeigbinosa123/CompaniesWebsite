from rest_framework import serializers
from .models import Designer, Order
 
# serializes designer profile objects into JSON
class DesignerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Designer
        fields = ['name', 'image', 'speciality']


class DesignerDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Designer
        fields = '__all__'


# serializes specific order objects when called upon
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['title', 'status', 'ordered_at']


# serializes all order objects when specific order details requested
class OrderDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

# serializer that enables designers to update order status
class UpdateStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['status']