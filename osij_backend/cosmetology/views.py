<<<<<<< HEAD
# cosmetology/views.py
from rest_framework import viewsets, permissions, filters
from .models import Stylist, Appointment
from .serializers import StylistSerializer, AppointmentSerializer
=======
from .models import StylistProfile
from django.db import models
from rest_framework import viewsets, permissions, filters, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Appointment, BeautyService, StylistProfile
from .serializers import (
    AppointmentSerializer,
    BeautyServiceSerializer,
    StylistProfileSerializer,
    StylistDetailsSerializer
)

>>>>>>> ac218696596a8434813a1b26a25e8b4728fe8157

class IsAuthenticatedOrReadOnly(permissions.IsAuthenticatedOrReadOnly):
    pass

class StylistViewSet(viewsets.ModelViewSet):
    queryset = StylistProfile.objects.filter(is_available=True).order_by("user__username")
    serializer_class = StylistProfileSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["specialization", "user__username"]
    ordering_fields = ["user__username"]


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.select_related("client", "stylist")
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["service", "notes", "status"]
    ordering_fields = ["start_time", "status"]

    def get_queryset(self):
        qs = super().get_queryset()
        return qs if self.request.user.is_staff else qs.filter(client=self.request.user)

    def perform_create(self, serializer):
        serializer.save(client=self.request.user)
<<<<<<< HEAD

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
=======
>>>>>>> ac218696596a8434813a1b26a25e8b4728fe8157

class ServicesListView(generics.ListAPIView):
    queryset = BeautyService.objects.filter(is_available=True)
    serializer_class = BeautyServiceSerializer
    permission_classes = [AllowAny]

class ServiceDetailsView(generics.RetrieveAPIView):
    queryset = BeautyService.objects.all()
    serializer_class = BeautyServiceSerializer

    permission_classes = [AllowAny]

class StylistsListView(generics.ListAPIView):
    queryset = StylistProfile.objects.filter(is_available=True)
    serializer_class = StylistProfileSerializer
    permission_classes = [AllowAny]

class StylistDetailsView(generics.RetrieveAPIView):
    queryset = StylistProfile.objects.all()
    serializer_class = StylistDetailsSerializer
    permission_classes = [AllowAny]

from .models import AppointmentBooking
from .serializers import AppointmentBookingSerializer, AppointmentCreateSerializer

class AppointmentBookingViewSet(viewsets.ModelViewSet):
    queryset = AppointmentBooking.objects.select_related("user", "service", "stylist")
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.action == "create":
            return AppointmentCreateSerializer
        return AppointmentBookingSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

<<<<<<< HEAD
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
=======
>>>>>>> ac218696596a8434813a1b26a25e8b4728fe8157
