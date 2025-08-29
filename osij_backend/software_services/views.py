from django.shortcuts import render
from rest_framework import generics, permissions
from .models import SoftwareEnquiry, SupportResponse
from .serializers import SoftwareEnquirySerializer, SupportResponseSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class SoftwareEnquiryListCreateView(generics.ListCreateAPIView):
    serializer_class = SoftwareEnquirySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Users can only see their own enquiries
        return SoftwareEnquiry.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class SoftwareEnquiryDetailView(generics.RetrieveAPIView):
    serializer_class = SoftwareEnquirySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SoftwareEnquiry.objects.filter(user=self.request.user)

class SupportResponseListCreateView(generics.ListCreateAPIView):
    serializer_class = SupportResponseSerializer
    permission_classes = [permissions.IsAdminUser]  # Only admins can create responses

    def get_queryset(self):
        # Admins can see all responses
        return SupportResponse.objects.all()

class UserSupportResponsesView(generics.ListAPIView):
    serializer_class = SupportResponseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Users can see responses to their enquiries
        return SupportResponse.objects.filter(enquiry__user=self.request.user)

from rest_framework import generics, permissions
from .models import SoftwareService  # You need to create this model
from .serializers import SoftwareServiceSerializer  # You need to create this serializer

# Add this to your existing views
class SoftwareServiceListView(generics.ListAPIView):
    queryset = SoftwareService.objects.all()
    serializer_class = SoftwareServiceSerializer
    permission_classes = [permissions.AllowAny]  # Allow anyone to view services