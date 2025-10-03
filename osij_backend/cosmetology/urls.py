from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    StylistViewSet,
    AppointmentViewSet,
    AppointmentBookingViewSet,
    ServicesListView,
    ServiceDetailsView,
    AppointmentAvailabilityCheckView,
)

router = DefaultRouter()
router.register(r"stylists", StylistViewSet, basename="stylist")
router.register(r"appointments", AppointmentViewSet, basename="appointment")
router.register(r"bookings", AppointmentBookingViewSet, basename="booking")

urlpatterns = router.urls + [
    path("services/", ServicesListView.as_view(), name="services-list"),
    path("services/<int:pk>/", ServiceDetailsView.as_view(), name="service-detail"),
    path("check-availability/", AppointmentAvailabilityCheckView.as_view(), name="check-appointment-availability"),
]
