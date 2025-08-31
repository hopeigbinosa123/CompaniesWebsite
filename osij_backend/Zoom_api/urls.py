from django.urls import path
from . import views

urlpatterns = [
    path('oauth/init/', views.ZoomOAuthInitView.as_view(), name='zoom-oauth-init'),
    path('oauth/callback/', views.ZoomOAuthCallbackView.as_view(), name='zoom-oauth-callback'),
    path('meetings/create/', views.CreateZoomMeetingView.as_view(), name='zoom-create-meeting'),
    path('meetings/list/', views.ListZoomMeetingsView.as_view(), name='zoom-list-meetings'),
    path('webhooks/', views.ZoomWebhookView.as_view(), name='zoom-webhooks'),
]