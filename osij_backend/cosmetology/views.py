# cosmetology/views.py
from django.shortcuts import render
from rest_framework import generics, permissions, viewsets, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime, timedelta
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
import logging

logger = logging.getLogger(__name__)

# ... (existing imports)

class AppointmentAvailabilityCheckView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        stylist_id = request.data.get('stylist')
        appointment_date_str = request.data.get('appointment_date')

        if not all([stylist_id, appointment_date_str]):
            return Response({'detail': 'Missing required fields.'}, status=400)

        try:
            stylist = StylistProfile.objects.get(id=stylist_id)
            appointment_date = datetime.fromisoformat(appointment_date_str).date()
        except (StylistProfile.DoesNotExist, ValueError) as e:
            logger.error(f"Error checking appointment availability: {str(e)}")
            return Response({'detail': str(e)}, status=400)

        # Check for number of appointments on that day for the stylist
        appointments_on_day = Appointment.objects.filter(
            stylist=stylist,
            appointment_date=appointment_date,
        ).count()

        # Assuming a stylist can have a maximum of 5 appointments per day.
        if appointments_on_day >= 5:
            return Response({'available': False, 'detail': 'This day is fully booked.'}, status=200)
        else:
            return Response({'available': True, 'detail': 'This day is available.'}, status=200)


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
    queryset = BeautyService.objects.all()
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

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.user != request.user:
            return Response(status=status.HTTP_403_FORBIDDEN)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


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

    