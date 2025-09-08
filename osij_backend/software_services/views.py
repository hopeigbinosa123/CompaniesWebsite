from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import SoftwareService, ServiceRequest, ProjectUpdate
from .serializers import SoftwareServiceSerializer, ServiceRequestSerializer, ProjectUpdateSerializer, ServiceRequestUpdateSerializer # Import new serializer

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

# Admin/Staff Views
class ServiceRequestUpdateView(generics.RetrieveUpdateAPIView):
    queryset = ServiceRequest.objects.all()
    serializer_class = ServiceRequestUpdateSerializer
    permission_classes = [permissions.IsAdminUser]
    lookup_field = 'pk' # Assuming primary key for lookup

class ProjectUpdateCreateView(generics.CreateAPIView):
    queryset = ProjectUpdate.objects.all()
    serializer_class = ProjectUpdateSerializer
    permission_classes = [permissions.IsAdminUser]

    def perform_create(self, serializer):
        # Ensure the service_request exists and is valid
        service_request_id = self.kwargs.get('service_request_pk')
        service_request = generics.get_object_or_404(ServiceRequest, pk=service_request_id)
        serializer.save(service_request=service_request)

class ProjectUpdateListView(generics.ListAPIView):
    serializer_class = ProjectUpdateSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        service_request_id = self.kwargs.get('service_request_pk')
        return ProjectUpdate.objects.filter(service_request__pk=service_request_id)
