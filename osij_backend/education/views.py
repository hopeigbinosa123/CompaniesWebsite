from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Course, Enrollment, Certificate, Video
from .serializers import (
    CourseSerializer,
    EnrollmentSerializer,
    CertificateSerializer,
    VideoSerializer,
)
from rest_framework.generics import RetrieveAPIView
from .models import Course
from .serializers import CourseSerializer
from rest_framework.generics import CreateAPIView
from .models import Enrollment
from .serializers import EnrollmentSerializer
from rest_framework.exceptions import ValidationError


# Create your views here.
class CourseList(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class EnrollmentList(generics.ListCreateAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer


class CertificateList(generics.ListCreateAPIView):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer


class CourseListView(APIView):
    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)


class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class EnrollmentCreateView(CreateAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer

    def perform_create(self, serializer):
        course = serializer.validated_data["course"]
        email = serializer.validated_data["email"]

        # Check for existing enrollment
        if Enrollment.objects.filter(course=course, email=email).exists():
            raise ValidationError("You are already enrolled in this course.")

        serializer.save()


class VideoDetailView(RetrieveAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    lookup_field = "pk"
