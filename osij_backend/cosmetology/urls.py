from django.urls import path
from .views import (
    ServicesListView,
    ServiceDetailsView,
    StylistsListView,
    StylistDetailsView,
    BookingView,
    AppointmentCreateView, # New import
    AllAppointmentsListView, # New import
    AppointmentUpdateView, # New import
)

urlpatterns = [
    path('services/', ServicesListView.as_view(), name='service-list'),
    path('services/<int:pk>/', ServiceDetailsView.as_view(), name='service-detail'),
    path('stylists/', StylistsListView.as_view(), name='stylist-list'),
    path('stylists/<int:pk>/', StylistDetailsView.as_view(), name='stylist-detail'),
    path('bookings/me/', BookingView.as_view(), name='user-bookings'),
    
    # New URLs
    path('bookings/create/', AppointmentCreateView.as_view(), name='appointment-create'),
    path('admin/bookings/', AllAppointmentsListView.as_view(), name='admin-all-bookings'),
    path('admin/bookings/<int:pk>/update/', AppointmentUpdateView.as_view(), name='admin-appointment-update'),
]