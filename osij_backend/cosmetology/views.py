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
        start_time_str = request.data.get('start_time')
        duration_minutes = request.data.get('duration_minutes')

        if not all([stylist_id, start_time_str, duration_minutes]):
            return Response({'detail': 'Missing required fields.'}, status=400)

        try:
            stylist = StylistProfile.objects.get(id=stylist_id)
            start_time = datetime.fromisoformat(start_time_str.replace('Z', '+00:00'))
            duration = timedelta(minutes=int(duration_minutes))
            end_time = start_time + duration
        except (StylistProfile.DoesNotExist, ValueError) as e:
            logger.error(f"Error checking appointment availability: {str(e)}")
            return Response({'detail': str(e)}, status=400)

        # Check for overlapping appointments
        overlapping_appointments = Appointment.objects.filter(
            stylist=stylist,
            start_time__lt=end_time,
            end_time__gt=start_time,
        ).exists()

        if overlapping_appointments:
            return Response({'available': False, 'detail': 'This time slot is already booked.'}, status=200)
        else:
            return Response({'available': True, 'detail': 'This time slot is available.'}, status=200)


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

    