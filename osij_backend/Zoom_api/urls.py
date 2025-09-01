from django.urls import path
from .views import CreateZoomMeetingView

urlpatterns = [
    path('meetings/create/', CreateZoomMeetingView.as_view(), name='zoom-create-meeting'),
]
