from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Order, Designer
from .serializers import DesignerSerializer, OrderSerializer

# Create your views here.

class Designer(APIView):
    def get(self, request, pk):
        designer = Designer.objects.all(pk=pk)
        serializer = DesignerSerializer(designer, many=True)
        return Response(serializer.data)

class Order(APIView):
    def get(self, request):
        order = Order.objects.all()
        serializer = OrderSerializer(order, many=True)
        return Response(serializer.data)