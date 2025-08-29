from django.urls import path
from . import views

urlpatterns = [
    path("courses/", views.CourseListView.as_view()),
    path("courses/<int:pk>/", views.CourseDetailView.as_view()),
    path("enrollments/", views.EnrollmentCreateView.as_view()),
    # path('progress/', views.ProgressView.as_view()),
    path("videos/<int:pk>/", views.VideoDetailView.as_view()),
    path("certificates/", views.CertificateList.as_view()),
]
