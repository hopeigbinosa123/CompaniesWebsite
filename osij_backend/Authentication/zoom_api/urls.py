from django.urls import path
from .views import ZoomAccessToken, ZoomMeetings

urlpatterns = [
    path('token/', ZoomAccessToken.as_view()),
    path('meetings/', ZoomMeetings.as_view()),
]
