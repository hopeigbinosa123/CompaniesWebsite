from django.urls import path
from . import views

urlpatterns = [
    # Course endpoints
    path("courses/", views.CourseListView.as_view(), name="course-list"),
    path("courses/<int:pk>/", views.CourseDetailView.as_view(), name="course-detail"),
    
    # Enrollment endpoints
    path("enrollments/", views.EnrollmentCreateView.as_view(), name="enrollment-create"),
    path("my-enrollments/", views.UserEnrollmentListView.as_view(), name="user-enrollments"),
    
    # Certificate endpoints
    path("my-certificates/", views.CertificateListView.as_view(), name="user-certificates"),
    
    # Video endpoints
    path("videos/<int:pk>/", views.VideoDetailView.as_view(), name="video-detail"),
    
    # Zoom integration
    path("courses/<int:course_id>/zoom-meeting/", views.ZoomMeetingView.as_view(), name="zoom-meeting"),
]