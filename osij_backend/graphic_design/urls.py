from django.urls import path
from .views import (
    DesignerView, 
    DesignerDetailsView, 
    OrderView, 
    OrderDetailsView, 
    UpdateStatusView, 
)

urlpatterns = [
    path('designers/', DesignerView.as_view(), name="designers_list"), 
    path('designers/<int:pk>/', DesignerDetailsView.as_view(), name="designer_details"), 
    path('orders/', OrderView.as_view(), name="UserOrders_list"), 
    path('orders/<int:pk>/', OrderDetailsView.as_view(), name="order_details"), 
    path('orders/<int:pk>/update_status/', UpdateStatusView.as_view(), name="update_OrderStatus"), 
]