# graphic_design/urls.py
from rest_framework.routers import DefaultRouter
from .views import DesignerViewSet, DesignOrderViewSet

router = DefaultRouter()
router.register(r"designers", DesignerViewSet, basename="designer")
router.register(r"orders", DesignOrderViewSet, basename="design-order")

urlpatterns = router.urls