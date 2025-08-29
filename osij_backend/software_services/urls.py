from django.urls import path
from .views import (
    SoftwareEnquiryListCreateView,
    SoftwareEnquiryDetailView,
    SupportResponseListCreateView,
    UserSupportResponsesView,
    SoftwareServiceListView
)

urlpatterns = [
    # Software enquiry endpoints
    path('enquiries/', SoftwareEnquiryListCreateView.as_view(), name='enquiry-list-create'),
    path('enquiries/<int:pk>/', SoftwareEnquiryDetailView.as_view(), name='enquiry-detail'),
    
    # Support response endpoints (admin)
    path('support-responses/', SupportResponseListCreateView.as_view(), name='support-response-list'),
    
    # User's support responses
    path('my-support-responses/', UserSupportResponsesView.as_view(), name='user-support-responses'),
    path('services/', SoftwareServiceListView.as_view(), name='service-list'),
]