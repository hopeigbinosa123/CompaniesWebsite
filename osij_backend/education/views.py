from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from .models import Course, Enrollment, Certificate, Video
from .serializers import (
    CourseSerializer,
    EnrollmentSerializer,
    CertificateSerializer,
    VideoSerializer,
)
from django.contrib.auth import get_user_model

User = get_user_model()

# Course Views
class CourseListView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.AllowAny]

class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.AllowAny]

# Enrollment Views
class EnrollmentCreateView(generics.CreateAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        course = serializer.validated_data["course"]
        user = self.request.user

        # Check for existing enrollment
        if Enrollment.objects.filter(course=course, user=user).exists():
            raise ValidationError("You are already enrolled in this course.")

        serializer.save(user=user)

class UserEnrollmentListView(generics.ListAPIView):
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Enrollment.objects.filter(user=self.request.user)

# Certificate Views
class CertificateListView(generics.ListAPIView):
    serializer_class = CertificateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Certificate.objects.filter(user=self.request.user)

# Video Views
class VideoDetailView(generics.RetrieveAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [permissions.IsAuthenticated]

# Zoom Integration View
class ZoomMeetingView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, course_id):
        """
        Create a Zoom meeting for a course
        Requires: course_id, topic, start_time, duration
        """
        try:
            course = Course.objects.get(id=course_id)
            # Here you would integrate with Zoom API
            # For now, we'll return a mock response
            zoom_data = {
                "join_url": f"https://zoom.us/j/mock-meeting-{course_id}",
                "meeting_id": f"mock_{course_id}_{request.user.id}",
                "topic": f"Live Session: {course.title}",
                "start_time": request.data.get('start_time'),
                "duration": request.data.get('duration', 60)
            }
            return Response(zoom_data, status=status.HTTP_201_CREATED)
            
        except Course.DoesNotExist:
            return Response(
                {"error": "Course not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )