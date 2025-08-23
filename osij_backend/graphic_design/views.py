from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Order, Designer
from .serializers import (
    DesignerSerializer, 
    DesignerDetailsSerializer, 
    OrderSerializer, 
    OrderDetailsSerializer,
    UpdateStatusSerializer, 
)

# Create your views here.

# view for showing a list of all graphic designers
class DesignerView(generics.ListAPIView):
    queryset = Designer.objects.all()
    serializer = DesignerSerializer
    
# view for showing a specific graphic designer's details
class DesignerDetailsView(generics.RetrieveAPIView):
    queryset = Designer.objects.all()
    serializer = DesignerDetailsSerializer

# A view for showing a list of all orders made by an authenticated user
# it shows only the orders made by the logged in user
class OrderView(generics.ListAPIView):
    serializer = OrderSerializer
    permission_classes = (IsAuthenticated)

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)
    
# A view for showing full details of an order
class OrderDetailsView(generics.RetrieveAPIView):
    serializer = OrderDetailsSerializer
    permission_classes = (IsAuthenticated)
    queryset = Order.objects.all()

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

# View for allowing graphic designers to update the status of an order assigned to them only
class UpdateStatusView(generics.UpdateAPIView):
    selializer = UpdateStatusSerializer
    permission_classes = (IsAuthenticated)

    def get_queryset(self):
        return Order.objects.filter(designer = self.request.user)