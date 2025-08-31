from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import SoftwareService, ServiceRequest, ProjectUpdate
from .serializers import SoftwareServiceSerializer, ServiceRequestSerializer, ProjectUpdateSerializer

class SoftwareServiceListView(generics.ListAPIView):
    queryset = SoftwareService.objects.filter(is_active=True)
    serializer_class = SoftwareServiceSerializer
    permission_classes = [permissions.AllowAny]

class ServiceRequestCreateView(generics.CreateAPIView):
    queryset = ServiceRequest.objects.all()
    serializer_class = ServiceRequestSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserServiceRequestsView(generics.ListAPIView):
    serializer_class = ServiceRequestSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return ServiceRequest.objects.filter(user=self.request.user)

class ServiceRequestDetailView(generics.RetrieveAPIView):
    serializer_class = ServiceRequestSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return ServiceRequest.objects.filter(user=self.request.user)