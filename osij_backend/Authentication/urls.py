from django.urls import path
from .views import RegisterView, LoginView, LogoutView, UserProfileView, get_csrf_token

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'), # handles user registration
    path('login/', LoginView.as_view(), name='login'), # handles user login
    path('logout/', LogoutView.as_view(), name='logout'), # handles user logout
    path('profile/', UserProfileView.as_view(), name='user-profile'), # handles user profile
    path('csrf/', get_csrf_token, name='get_csrf'), # handles csrf token
]
