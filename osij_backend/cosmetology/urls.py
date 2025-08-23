from django.urls import path
from .views import (
    ServicesListView, 
    ServiceDetailsView, 
    StylistsListView, 
    StylistDetailsView, 
    BookingView, 
)

urlpatterns = [
    path('services/', ServicesListView.as_view(), name='services_list'),
    path('services/<int:pk>/', ServiceDetailsView.as_view(), name="service_details"),
    path('stylists/', StylistsListView.as_view(), name='stylists_list'),
    path('stylists/<int:pk>/', StylistDetailsView.as_view(), name='stylist_details'),
    path('bookings/', BookingView.as_view(), name='appointment_bookings'),
]