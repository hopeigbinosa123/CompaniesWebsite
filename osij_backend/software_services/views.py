from django.shortcuts import render
from .models import SoftwareEnquiry, SupportResponse
from rest_framework import generics
from .serializers import SoftwareEnquirySerializer, SupportResponseSerializer

# Create your views here.

class EnquiryList(generics.ListCreateAPIView):
    queryset = SoftwareEnquiry.objects.all()
    serializer_class = SoftwareEnquirySerializer

class ResponseList(generics.ListCreateAPIView):
    queryset = SupportResponse.objects.all()
    serializer_class = SupportResponseSerializer