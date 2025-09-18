from django.urls import path
from .views import (
    SoftwareServiceListView,
    ServiceRequestCreateView,
    UserServiceRequestsView,
    ServiceRequestDetailView,
    ServiceRequestUpdateView, # New import
    ProjectUpdateCreateView,  # New import
    ProjectUpdateListView,    # New import
)

urlpatterns = [
    path('services/', SoftwareServiceListView.as_view(), name='software-service-list'),
    path('requests/create/', ServiceRequestCreateView.as_view(), name='service-request-create'),
    path('requests/me/', UserServiceRequestsView.as_view(), name='user-service-requests'),
    path('requests/<int:pk>/', ServiceRequestDetailView.as_view(), name='service-request-detail'),
    
    # Admin/Staff URLs
    path('admin/requests/<int:pk>/update/', ServiceRequestUpdateView.as_view(), name='admin-service-request-update'),
    path('admin/requests/<int:service_request_pk>/updates/create/', ProjectUpdateCreateView.as_view(), name='admin-project-update-create'),
    path('admin/requests/<int:service_request_pk>/updates/', ProjectUpdateListView.as_view(), name='admin-project-update-list'),
]