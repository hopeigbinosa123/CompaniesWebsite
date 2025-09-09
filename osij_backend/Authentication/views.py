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
# Create your views here.

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response(
                {
                    "message": "User created successfully",
                    "token": token.key,
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                        "first_name": user.first_name,
                        "last_name": user.last_name
                    }
                },
                status=status.HTTP_201_CREATED
            )
        print("Serializer errors:", serializer.errors)  # Debug log
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        print("Request data:", request.data)  # Debug log
        try:
            serializer = LoginSerializer(data=request.data)
            if not serializer.is_valid():
                print("Validation errors:", serializer.errors)  # Debug log
                print("Raw request data:", request.body)  # Add this line
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                
            # Get the validated user from the serializer
            user = serializer.validated_data.get('user')
            if not user:
                return Response(
                    {"error": "User not found in validated data"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            token, created = Token.objects.get_or_create(user=user)
            
            return Response({
                'token': token.key,
                'user': UserSerializer(user).data,
                'access': token.key
            })
            
        except Exception as e:
            import traceback
            print("Unexpected error:", str(e))
            print("Traceback:", traceback.format_exc())
            return Response(
                {"error": "An unexpected error occurred", "detail": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
class LogoutView(APIView):
    def post(self, request):
        # Delete the token if using token authentication
        request.user.auth_token.delete()
        logout(request)
        return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)

class UserProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            # Handle password hashing if password is being updated
            if 'password' in serializer.validated_data:
                serializer.validated_data['password'] = make_password(
                    serializer.validated_data['password']
                )
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def get_csrf_token(request):
    """
    Get CSRF token for the session
    """
    from django.http import JsonResponse
    from django.views.decorators.csrf import ensure_csrf_cookie
    
    @ensure_csrf_cookie
    def get_csrf(request):
        return JsonResponse({'detail': 'CSRF cookie set'})
    
    response = get_csrf(request)
    response['X-CSRFToken'] = request.META.get('CSRF_COOKIE')
    return response