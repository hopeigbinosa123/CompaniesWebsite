from django.urls import path
from . import views

urlpatterns = [
    path('services/', views.SoftwareServiceListView.as_view(), name='service-list'),
    path('requests/', views.ServiceRequestCreateView.as_view(), name='service-request-create'),
    path('my-requests/', views.UserServiceRequestsView.as_view(), name='user-service-requests'),
    path('requests/<int:pk>/', views.ServiceRequestDetailView.as_view(), name='service-request-detail'),
]