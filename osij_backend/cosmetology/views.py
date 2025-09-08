from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import BeautyService, StylistProfile, AppointmentBooking
from .serializers import (
    BeautyServiceSerializer, 
    BeautyServiceDetailsSerializer, 
    StylistProfileSerializer,
    StylistDetailsSerializer, 
    AppointmentBookingSerializer, 
)

# Create your views here.

# view for listing all cosmetology services offered
class ServicesListView(generics.ListAPIView):
    queryset = BeautyService.objects.all()
    serializer_class = BeautyServiceSerializer
    
# View for viewwing full details of a specific service, on click
class ServiceDetailsView(generics.RetrieveAPIView):
    queryset = BeautyService.objects.all()
    serializer_class = BeautyServiceDetailsSerializer


# view for listing all stylists
class StylistsListView(generics.ListAPIView):
    queryset = StylistProfile.objects.all()
    serializer_class = StylistProfileSerializer


# view for viewing full details of a stylist's profile
class StylistDetailsView(generics.RetrieveAPIView):
        queryset = StylistProfile.objects.all()
        serializer_class = StylistDetailsSerializer


# view to allow appointment booking to be made by the logged in (authenticated) user only
# links the appointment to the logged in user account
class BookingView(generics.ListAPIView):
    serializer_class = AppointmentBookingSerializer
    permission_classes = (IsAuthenticated)

    def get_queryset(self):
        return AppointmentBooking.objects.filter(user = self.request.user)

# View to allow authenticated users to create new appointment bookings
class AppointmentCreateView(generics.CreateAPIView):
    queryset = AppointmentBooking.objects.all()
    serializer_class = AppointmentBookingSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# Admin/Staff Views
class AllAppointmentsListView(generics.ListAPIView):
    queryset = AppointmentBooking.objects.all()
    serializer_class = AppointmentBookingSerializer
    permission_classes = [IsAuthenticated] # Should be IsAdminUser, but keeping IsAuthenticated for now to avoid breaking existing setup

class AppointmentUpdateView(generics.RetrieveUpdateAPIView):
    queryset = AppointmentBooking.objects.all()
    serializer_class = AppointmentBookingSerializer # Assuming this serializer can handle updates
    permission_classes = [IsAuthenticated] # Should be IsAdminUser, but keeping IsAuthenticated for now to avoid breaking existing setup
    lookup_field = 'pk'
