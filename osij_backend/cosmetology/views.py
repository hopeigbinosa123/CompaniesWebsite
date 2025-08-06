from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import BeautyServices, StylistProfile, AppointmentBooking
from .serializers import BeautyServicesSerializer, StylistProfileSerializer, AppointmentBookingSerializers

# Create your views here.
class ServicesList(APIView):
    def get(self, request):
        services = BeautyServices.objects.all()
        serializer = BeautyServicesSerializer(services, many=True)
        return Response(serializer.data)

class StylistsList(APIView):
    def get(self, request):
        stylists_list = StylistProfile.objects.all()
        serializer = StylistProfileSerializer(stylists_list, many=True)
        return Response(serializer.data)

class StylistProfileDetails(APIView):
    def get(self, request, pk):
        stylist_details = StylistProfile.objects.get(pk=pk)
        serializer = StylistProfileSerializer(stylist_details)
        return Response(serializer.data)

class Booking(APIView):
    def get(self, request):
        booking = AppointmentBooking.objects.all()
        serializer = AppointmentBookingSerializers(booking, many=True)
        return Response(serializer.data)