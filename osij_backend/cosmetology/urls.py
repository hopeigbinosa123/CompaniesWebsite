from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    StylistViewSet,
    AppointmentViewSet,
    AppointmentBookingViewSet,
    ServicesListView,  #  Add this
)

router = DefaultRouter()
router.register(r"stylists", StylistViewSet, basename="stylist")
router.register(r"appointments", AppointmentViewSet, basename="appointment")
router.register(r"bookings", AppointmentBookingViewSet, basename="booking")

urlpatterns = router.urls + [
    path("services/", ServicesListView.as_view(), name="services-list"),  # Add this
]
