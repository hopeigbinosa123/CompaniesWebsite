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
