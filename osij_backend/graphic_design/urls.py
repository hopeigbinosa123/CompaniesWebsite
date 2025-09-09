from django.urls import path
from .views import (
    DesignerListView,
    DesignerDetailView,
    OrderCreateView,
    UserOrderListView,
    OrderDetailView,
    OrderUpdateView, # New import
)

urlpatterns = [
    path('designers/', DesignerListView.as_view(), name='designer-list'),
    path('designers/<int:pk>/', DesignerDetailView.as_view(), name='designer-detail'),
    path('orders/create/', OrderCreateView.as_view(), name='order-create'),
    path('orders/me/', UserOrderListView.as_view(), name='user-order-list'),
    path('orders/<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
    
    # Admin/Staff URL
    path('admin/orders/<int:pk>/update/', OrderUpdateView.as_view(), name='admin-order-update'),
]