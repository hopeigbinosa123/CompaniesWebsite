<<<<<<< HEAD
# cosmetology/views.py
from rest_framework import viewsets, permissions, filters
from .models import Stylist, Appointment
from .serializers import StylistSerializer, AppointmentSerializer

class IsAuthenticatedOrReadOnly(permissions.IsAuthenticatedOrReadOnly):
    pass


class StylistViewSet(viewsets.ModelViewSet):
    queryset = Stylist.objects.filter(is_active=True).order_by("name")
    serializer_class = StylistSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "specialties"]
    ordering_fields = ["name"]


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.select_related("client", "stylist")
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["service", "notes", "status"]
    ordering_fields = ["start_time", "status"]

    def get_queryset(self):
        qs = super().get_queryset()
        # Users see their own appointments; staff can see all
        if self.request.user.is_staff:
            return qs
        return qs.filter(client=self.request.user)

    def perform_create(self, serializer):
        serializer.save(client=self.request.user)
=======
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
>>>>>>> 85c70677a912d112ee4c8ddeb8cbb9bba28816a4
