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
    serializer = BeautyServiceSerializer
    
# View for viewwing full details of a specific service, on click
class ServiceDetailsView(generics.RetrieveAPIView):
    queryset = BeautyService.objects.all()
    serializer = BeautyServiceDetailsSerializer


# view for listing all stylists
class StylistsListView(generics.ListAPIView):
    queryset = StylistProfile.objects.all()
    serializer = StylistProfileSerializer


# view for viewing full details of a stylist's profile
class StylistDetailsView(generics.RetrieveAPIView):
        queryset = StylistProfile.objects.all()
        serializer = StylistDetailsSerializer


# view to allow appointment booking to be made by the logged in (authenticated) user only
# links the appointment to the logged in user account
class BookingView(generics.ListAPIView):
    serializer = AppointmentBookingSerializer
    permission_classes = (IsAuthenticated)

    def get_queryset(self):
        return AppointmentBooking.objects.filter(user = self.request.user)