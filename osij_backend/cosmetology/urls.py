from django.urls import path
from .views import ServicesList, StylistsList, StylistProfileDetails, Booking

urlpatterns = [
    path('services/', ServicesList.as_view(), name='services-list'),
    path('stylists/', StylistsList.as_view(), name='stylists-list'),
    path('stylists/<int:pk>/', StylistsList.as_view(), name='stylist-details'),
    path('bookings/', Booking.as_view(), name='bookings'),
]