from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import BeautyService, StylistProfile, AppointmentBooking
from .serializers import (
    BeautyServiceSerializer, 
    BeautyServiceDetailsSerializer, 
    StylistProfileSerializer,
    StylistDetailsSerializer, 
    AppointmentBookingSerializer,
    AppointmentCreateSerializer,
)

# Create your views here.

# view for listing all cosmetology services offered
class ServicesListView(generics.ListAPIView):
    queryset = BeautyService.objects.filter(is_available=True)
    serializer_class = BeautyServiceSerializer
    permission_classes = [AllowAny]
    
# View for viewing full details of a specific service, on click
class ServiceDetailsView(generics.RetrieveAPIView):
    queryset = BeautyService.objects.all()
    serializer_class = BeautyServiceDetailsSerializer
    permission_classes = [AllowAny]


# view for listing all stylists
class StylistsListView(generics.ListAPIView):
    queryset = StylistProfile.objects.filter(is_available=True)
    serializer_class = StylistProfileSerializer
    permission_classes = [AllowAny]


# view for viewing full details of a stylist's profile
class StylistDetailsView(generics.RetrieveAPIView):
    queryset = StylistProfile.objects.all()
    serializer_class = StylistDetailsSerializer
    permission_classes = [AllowAny]


# view to allow appointment booking to be made by the logged in (authenticated) user only
# links the appointment to the logged in user account
class BookingView(generics.ListAPIView):
    serializer_class = AppointmentBookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return AppointmentBooking.objects.filter(user=self.request.user)

# View to allow authenticated users to create new appointment bookings
class AppointmentCreateView(generics.CreateAPIView):
    queryset = AppointmentBooking.objects.all()
    serializer_class = AppointmentCreateSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

# Admin/Staff Views
class AllAppointmentsListView(generics.ListAPIView):
    queryset = AppointmentBooking.objects.all()
    serializer_class = AppointmentBookingSerializer
    permission_classes = [IsAuthenticated]

class AppointmentUpdateView(generics.UpdateAPIView):
    queryset = AppointmentBooking.objects.all()
    serializer_class = AppointmentBookingSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'
