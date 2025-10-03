# cosmetology/views.py
from django.shortcuts import render
from rest_framework import generics, permissions, viewsets, filters
from rest_framework.permissions import (
    IsAuthenticated,
    AllowAny,
    IsAuthenticatedOrReadOnly,
)
from .models import BeautyService, StylistProfile, AppointmentBooking, Appointment
from .serializers import (
    BeautyServiceSerializer,
    StylistProfileSerializer,
    StylistDetailsSerializer,
    AppointmentBookingSerializer,
    AppointmentCreateSerializer,
    AppointmentSerializer,
)


class StylistViewSet(viewsets.ModelViewSet):
    queryset = StylistProfile.objects.filter(is_available=True).order_by(
        "user__username"
    )
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


class AppointmentBookingViewSet(viewsets.ModelViewSet):
    queryset = AppointmentBooking.objects.select_related("user", "service", "stylist")
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.action == "create":
            return AppointmentCreateSerializer
        return AppointmentBookingSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
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
    lookup_field = "pk"
