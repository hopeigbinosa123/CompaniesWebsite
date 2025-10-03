from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password
from .models import User
from .serializers import UserSerializer, LoginSerializer
from rest_framework.decorators import api_view, permission_classes
from django.middleware.csrf import get_token
from rest_framework_simplejwt.tokens import RefreshToken

# Imports for Dashboard
from education.models import Enrollment
from cosmetology.models import AppointmentBooking
from graphic_design.models import DesignOrder
from software_services.models import ServiceRequest
from education.serializers import EnrollmentSerializer
from cosmetology.serializers import AppointmentBookingSerializer
from graphic_design.serializers import DesignOrderSerializer
from software_services.serializers import ServiceRequestSerializer

# Create your views here.


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):  # handles user registration
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)

            # Get CSRF token
            from django.middleware.csrf import get_token

            csrf_token = get_token(request)

            response_data = {
                "message": "User created successfully",
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                },
                "csrf_token": csrf_token,
            }  # handles user registration

            response = Response(response_data, status=status.HTTP_201_CREATED)

            # Set CSRF cookie
            response.set_cookie(
                "csrftoken", csrf_token, httponly=False, samesite="Lax", secure=False
            )

            # Set refresh token in HttpOnly cookie
            response.set_cookie(
                "refresh_token",
                str(refresh),
                httponly=True,
                samesite="Lax",
                secure=False,
                max_age=60 * 60 * 24 * 7,  # 7 days
            )

            return response

        print("Serializer errors:", serializer.errors)  # Debug log
        return Response(
            {"error": "Registration failed", "details": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        print("Request data:", request.data)  # Debug log
        try:
            serializer = LoginSerializer(data=request.data)
            if not serializer.is_valid():
                print("Validation errors:", serializer.errors)  # Debug log
                return Response(
                    {"error": "Invalid credentials", "details": serializer.errors},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Get the validated user from the serializer
            user = serializer.validated_data.get("user")
            if not user:
                return Response(
                    {"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST
                )

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)

            # Set session for CSRF
            from django.contrib.auth import login

            login(request, user)

            # Get CSRF token
            from django.middleware.csrf import get_token

            csrf_token = get_token(request)

            response_data = {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": UserSerializer(user).data,
                "csrf_token": csrf_token,
            }

            response = Response(response_data, status=status.HTTP_200_OK)

            # Set CSRF cookie
            response.set_cookie(
                "csrftoken",
                csrf_token,
                httponly=False,  # Allow JavaScript to access
                samesite="Lax",
                secure=False,  # Set to True in production with HTTPS
            )

            # Set refresh token in HttpOnly cookie for better security
            response.set_cookie(
                "refresh_token",
                str(refresh),
                httponly=True,
                samesite="Lax",
                secure=False,  # Set to True in production with HTTPS
                max_age=60 * 60 * 24 * 7,  # 7 days
            )

            return response

        except Exception as e:
            import traceback

            print("Unexpected error:", str(e))
            print("Traceback:", traceback.format_exc())
            return Response(
                {"error": "An unexpected error occurred", "detail": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class LogoutView(APIView):
    def post(self, request):
        # Delete the token if using token authentication
        request.user.auth_token.delete()
        logout(request)
        return Response(
            {"message": "Successfully logged out"}, status=status.HTTP_200_OK
        )


class UserProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):  # handles user profile
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):  # handles user profile update
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            # Handle password hashing if password is being updated
            if "password" in serializer.validated_data:
                serializer.validated_data["password"] = make_password(
                    serializer.validated_data["password"]
                )
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])  # handles csrf token
@permission_classes([permissions.AllowAny])
def get_csrf_token(request):
    """
    Get CSRF token for the session
    """
    from django.http import JsonResponse

    response = JsonResponse({"detail": "CSRF cookie set"})  # handles csrf token
    response["X-CSRFToken"] = get_token(request)
    return response


import logging

logger = logging.getLogger(__name__)


class DashboardView(APIView):
    """
    Provides a summary of the user's activity across all services.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        logger.info(f"Fetching dashboard data for user: {user.username}")

        # Fetch recent data from different apps (e.g., latest 5 for each)
        enrollments = Enrollment.objects.filter(user=user).order_by('-enrolled_at')[:5]
        appointments = AppointmentBooking.objects.filter(user=user).order_by('-appointment_date')[:5]
        logger.info(f"Found {appointments.count()} appointments for user {user.username}")
        for app in appointments:
            logger.info(f"Appointment: {app.id}, Date: {app.appointment_date}")

        design_orders = DesignOrder.objects.filter(client=user).order_by('-created_at')[:5]
        service_requests = ServiceRequest.objects.filter(user=user).order_by('-created_at')[:5]

        # Serialize the data
        enrollments_data = EnrollmentSerializer(enrollments, many=True, context={'request': request}).data
        appointments_data = AppointmentBookingSerializer(appointments, many=True).data
        logger.info(f"Serialized appointments data: {appointments_data}")

        design_orders_data = DesignOrderSerializer(design_orders, many=True).data
        service_requests_data = ServiceRequestSerializer(service_requests, many=True).data

        # Combine into a single response
        dashboard_data = {
            'enrolled_courses': enrollments_data,
            'booked_appointments': appointments_data,
            'recent_orders': design_orders_data,
            'software_projects': service_requests_data,
        }
        logger.info(f"Final dashboard data being sent: {dashboard_data}")

        return Response(dashboard_data, status=status.HTTP_200_OK)
