from django.urls import path
from . import views

urlpatterns = [
    path('create-order/', views.CreatePayPalOrder.as_view(), name='create-paypal-order'),
    path('capture-order/<str:order_id>/', views.CapturePayPalOrder.as_view(), name='capture-paypal-order'),
]
