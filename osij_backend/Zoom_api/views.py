from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import redirect
from django.conf import settings
from .zoom_config import ZoomConfig
from .services import ZoomService
from .models import ZoomMeeting, ZoomOAuthToken
from .utils import get_lesson_by_id
from education.models import Lesson
import json

class ZoomOAuthInitView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Redirect user to Zoom OAuth authorization"""
        auth_url = ZoomConfig.get_auth_url(state=str(request.user.id))
        return Response({'auth_url': auth_url})


class ZoomOAuthCallbackView(APIView):
    def get(self, request):
        """Handle Zoom OAuth callback"""
        code = request.GET.get('code')
        error = request.GET.get('error')

        if error:
            return Response({'error': error}, status=status.HTTP_400_BAD_REQUEST)

        if not code:
            return Response({'error': 'Authorization code missing'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            tokens = ZoomService.get_oauth_tokens(code)
            user_id = request.GET.get('state')

            if user_id:
                from django.contrib.auth import get_user_model
                User = get_user_model()
                user = User.objects.get(id=user_id)

                ZoomOAuthToken.objects.update_or_create(
                    user=user,
                    defaults={
                        'access_token': tokens['access_token'],
                        'refresh_token': tokens['refresh_token'],
                        'expires_in': tokens['expires_in'],
                        'token_type': tokens['token_type'],
                        'scope': tokens['scope']
                    }
                )

            frontend_url = f"{settings.FRONTEND_URL}/dashboard?zoom_connected=true"
            return redirect(frontend_url)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ZoomAccessTokenView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Get or refresh Zoom access token for the current user"""
        try:
            try:
                zoom_token = ZoomOAuthToken.objects.get(user=request.user)
            except ZoomOAuthToken.DoesNotExist:
                return Response(
                    {'error': 'Zoom account not connected. Please authenticate first.'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            if zoom_token.is_expired():
                new_tokens = ZoomService.refresh_oauth_token(zoom_token.refresh_token)
                zoom_token.access_token = new_tokens['access_token']
                zoom_token.refresh_token = new_tokens['refresh_token']
                zoom_token.expires_in = new_tokens['expires_in']
                zoom_token.save()

            return Response({
                'access_token': zoom_token.access_token,
                'expires_in': zoom_token.expires_in,
                'token_type': zoom_token.token_type,
                'scope': zoom_token.scope
            })

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class CreateZoomMeetingView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """Create a Zoom meeting for a lesson"""
        try:
            lesson_id = request.data.get('lesson_id')
            topic = request.data.get('topic', 'Mentorship Session')
            start_time = request.data.get('start_time')
            duration = request.data.get('duration', 60)

            access_token = ZoomService.get_access_token(request.user)
            if not access_token:
                return Response({'error': 'Zoom not connected. Please authenticate first.'}, status=400)

            meeting_data = {
                'topic': topic,
                'type': 2,
                'start_time': start_time,
                'duration': duration,
                'timezone': 'UTC',
                'settings': {
                    'host_video': True,
                    'participant_video': True,
                    'join_before_host': False,
                    'mute_upon_entry': True,
                    'waiting_room': True,
                }
            }

            zoom_meeting = ZoomService.create_meeting(access_token, meeting_data)
            lesson = get_lesson_by_id(lesson_id)

            zoom_meeting_obj = ZoomMeeting.objects.create(
                meeting_id=zoom_meeting['id'],
                topic=zoom_meeting['topic'],
                agenda=zoom_meeting.get('agenda', ''),
                start_time=zoom_meeting['start_time'],
                duration=zoom_meeting['duration'],
                timezone=zoom_meeting['timezone'],
                password=zoom_meeting.get('password', ''),
                join_url=zoom_meeting['join_url'],
                start_url=zoom_meeting['start_url'],
                lesson=lesson,
                instructor=request.user
            )

            return Response({
                'meeting': zoom_meeting,
                'database_id': zoom_meeting_obj.id
            }, status=201)

        except Exception as e:
            return Response({'error': str(e)}, status=400)


class ListZoomMeetingsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """List user's Zoom meetings"""
        meetings = ZoomMeeting.objects.filter(instructor=request.user, is_active=True)
        meeting_data = []

        for meeting in meetings:
            meeting_data.append({
                'id': meeting.id,
                'meeting_id': meeting.meeting_id,
                'topic': meeting.topic,
                'start_time': meeting.start_time,
                'duration': meeting.duration,
                'join_url': meeting.join_url,
                'lesson_title': meeting.lesson.title if meeting.lesson else None
            })

        return Response({'meetings': meeting_data})


class ZoomWebhookView(APIView):
    def post(self, request):
        """Handle Zoom webhooks for meeting events"""
        event = request.data.get('event')

        if event == 'meeting.started':
            meeting_id = request.data['payload']['object']['id']
            # TODO: Update meeting status
            pass

        elif event == 'meeting.ended':
            meeting_id = request.data['payload']['object']['id']
            # TODO: Update meeting status, fetch recording
            pass

        return Response({'status': 'webhook_received'})

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ZoomMeeting
from .serializers import ZoomMeetingSerializer
import requests

class ZoomAccessTokenView(APIView):
    def post(self, request):
        # Example: exchange auth code for access token
        auth_code = request.data.get("code")
        if not auth_code:
            return Response({"error": "Missing authorization code"}, status=status.HTTP_400_BAD_REQUEST)

        # Replace with your actual Zoom credentials and endpoint
        token_url = "https://zoom.us/oauth/token"
        payload = {
            "grant_type": "authorization_code",
            "code": auth_code,
            "redirect_uri": "YOUR_REDIRECT_URI",
        }
        headers = {
            "Authorization": "Basic YOUR_BASE64_ENCODED_CLIENTID_SECRET"
        }

        response = requests.post(token_url, data=payload, headers=headers)
        return Response(response.json(), status=response.status_code)

class CreateZoomMeetingView(APIView):
    def post(self, request):
        serializer = ZoomMeetingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
