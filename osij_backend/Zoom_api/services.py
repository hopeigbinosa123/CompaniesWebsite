import requests
from django.conf import settings

class ZoomService:
    @staticmethod
    def create_meeting(access_token, meeting_data):
        try:
            response = requests.post(
                f"{settings.ZOOM_API_BASE_URL}/users/me/meetings",
                headers={
                    "Authorization": f"Bearer {access_token}",
                    "Content-Type": "application/json"
                },
                json=meeting_data
            )
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            raise Exception(f"Zoom API error: {str(e)}")

    @staticmethod
    def get_access_token(user):
        from .models import ZoomOAuthToken
        try:
            token = ZoomOAuthToken.objects.get(user=user)
            if token.is_expired():
                new_tokens = ZoomService.refresh_oauth_token(token.refresh_token)
                token.access_token = new_tokens['access_token']
                token.refresh_token = new_tokens['refresh_token']
                token.expires_in = new_tokens['expires_in']
                token.save()
            return token.access_token
        except ZoomOAuthToken.DoesNotExist:
            return None

    @staticmethod
    def refresh_oauth_token(refresh_token):
        payload = {
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token
        }
        auth = (settings.ZOOM_CLIENT_ID, settings.ZOOM_CLIENT_SECRET)
        response = requests.post(
            'https://zoom.us/oauth/token',
            params=payload,
            auth=auth
        )
        response.raise_for_status()
        return response.json()
