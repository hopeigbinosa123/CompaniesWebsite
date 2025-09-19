from django.urls import path
from . import views

urlpatterns = [
    # Course endpoints
    path("courses/", views.CourseListCreateView.as_view(), name="course-list"),
    path("courses/<int:pk>/", views.CourseDetailView.as_view(), name="course-detail"),
    path(
        "courses/<int:pk>/lessons/",
        views.CourseLessonsView.as_view(),
        name="course-lessons",
    ),
    # Enrollment endpoints
    path("enrollments/", views.EnrollmentView.as_view(), name="enrollments"),
    path("my-enrollments/", views.MyEnrollmentsView.as_view(), name="my-enrollments"),
    path("enroll/", views.EnrollView.as_view(), name="enroll"),
    # Lesson endpoints
    path(
        "lessons/<int:lesson_id>/complete/",
        views.MarkLessonCompleteView.as_view(),
        name="mark-lesson-complete",
    ),
    # Live sessions
    path(
        "live-sessions/upcoming/",
        views.UpcomingLiveSessionsView.as_view(),
        name="upcoming-live-sessions",
    ),
]
