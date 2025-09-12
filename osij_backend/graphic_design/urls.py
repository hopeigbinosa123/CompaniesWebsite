# graphic_design/urls.py
from rest_framework.routers import DefaultRouter
from .views import DesignerViewSet, DesignOrderViewSet

<<<<<<< HEAD
router = DefaultRouter()
router.register(r"designers", DesignerViewSet, basename="designer")
router.register(r"orders", DesignOrderViewSet, basename="design-order")

urlpatterns = router.urls
=======
urlpatterns = [
    path('designers/', DesignerListView.as_view(), name='designer-list'),
    path('designers/<int:pk>/', DesignerDetailView.as_view(), name='designer-detail'),
    path('orders/create/', OrderCreateView.as_view(), name='order-create'),
    path('orders/me/', UserOrderListView.as_view(), name='user-order-list'),
    path('orders/<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
    path('admin/orders/<int:pk>/update/', OrderUpdateView.as_view(), name='admin-order-update'),  # Added this line
]
>>>>>>> 85c70677a912d112ee4c8ddeb8cbb9bba28816a4
