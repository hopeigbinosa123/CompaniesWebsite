from django.urls import path
from . import views

urlpatterns = [
    path('courses/', views.CourseListView.as_view(), name='course-list'),
    path('courses/<int:pk>/', views.CourseDetailView.as_view(), name='course-detail'),
    path('courses/<int:course_id>/lessons/', views.CourseLessonsView.as_view(), name='course-lessons'),
    path('enroll/', views.EnrollmentView.as_view(), name='enroll'),
    path('lessons/<int:lesson_id>/complete/', views.MarkLessonCompleteView.as_view(), name='mark-lesson-complete'),
    path('live-sessions/upcoming/', views.UpcomingLiveSessionsView.as_view(), name='upcoming-live-sessions'),
]