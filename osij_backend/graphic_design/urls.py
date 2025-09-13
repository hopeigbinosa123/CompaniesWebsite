from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    DesignerViewSet, DesignOrderViewSet,
    DesignerListView, DesignerDetailView,
    OrderCreateView, UserOrderListView,
    OrderDetailView, OrderUpdateView
)

router = DefaultRouter()
router.register(r'designers', DesignerViewSet)
router.register(r'design-orders', DesignOrderViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('public/designers/', DesignerListView.as_view(), name='public-designer-list'),
    path('public/designers/<int:pk>/', DesignerDetailView.as_view(), name='public-designer-detail'),
    path('orders/create/', OrderCreateView.as_view(), name='order-create'),
    path('orders/my/', UserOrderListView.as_view(), name='user-order-list'),
    path('orders/<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
    path('orders/<int:pk>/update/', OrderUpdateView.as_view(), name='order-update'),
]
