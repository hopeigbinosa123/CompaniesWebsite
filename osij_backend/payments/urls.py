from django.urls import path
from . import views

urlpatterns = [
    path(
        "create-order/",
        views.CreatePayPalOrderView.as_view(),
        name="create-paypal-order",
    ),
    path(
        "capture-order/<str:order_id>/",
        views.CapturePayPalOrderView.as_view(),
        name="capture-paypal-order",
    ),
]
