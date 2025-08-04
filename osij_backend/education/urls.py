from django.urls import path
from .views import CourseList, EnrollmentList, CertificateList

urlpatterns = [
    path('courses/', CourseList.as_view()),
    path('enrollments/', EnrollmentList.as_view()),
    path('certificates/', CertificateList.as_view()),
]