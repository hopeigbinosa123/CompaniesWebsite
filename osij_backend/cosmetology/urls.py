# cosmetology/urls.py
from rest_framework.routers import DefaultRouter
from .views import StylistViewSet, AppointmentViewSet

router = DefaultRouter()
router.register(r"stylists", StylistViewSet, basename="stylist")
router.register(r"appointments", AppointmentViewSet, basename="appointment")

urlpatterns = router.urls
