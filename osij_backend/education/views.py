from django.shortcuts import render
from rest_framework import generics
from .models import Course, Enrollment, Certificate
from .serializers import CourseSerializer, EnrollmentSerializer, CertificateSerializer

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
