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

