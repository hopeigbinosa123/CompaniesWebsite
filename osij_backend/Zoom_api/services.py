# zoom_api/services.py
import requests
import json
from django.utils import timezone
from datetime import timedelta
from .zoom_config import ZoomConfig
from .models import ZoomOAuthToken

class ZoomService:
    @staticmethod
    def get_oauth_tokens(authorization_code):
        """Exchange authorization code for access tokens"""
        data = {
            'grant_type': 'authorization_code',
            'code': authorization_code,
            'redirect_uri': ZoomConfig.REDIRECT_URI
        }
        
        response = requests.post(
            ZoomConfig.TOKEN_URL,
            data=data,
            auth=(ZoomConfig.CLIENT_ID, ZoomConfig.CLIENT_SECRET)
        )
        
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Zoom OAuth error: {response.text}")
    
    @staticmethod
    def refresh_oauth_token(refresh_token):
        """Refresh expired access token"""
        data = {
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token
        }
        
        response = requests.post(
            ZoomConfig.TOKEN_URL,
            data=data,
            auth=(ZoomConfig.CLIENT_ID, ZoomConfig.CLIENT_SECRET)
        )
        
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Zoom token refresh error: {response.text}")
    
    @staticmethod
    def get_access_token(user):
        """Get valid access token for a user"""
        try:
            token = ZoomOAuthToken.objects.get(user=user)
            if token.is_expired():
                # Refresh token
                new_tokens = ZoomService.refresh_oauth_token(token.refresh_token)
                token.access_token = new_tokens['access_token']
                token.refresh_token = new_tokens['refresh_token']
                token.expires_in = new_tokens['expires_in']
                token.save()
            return token.access_token
        except ZoomOAuthToken.DoesNotExist:
            return None
    
    @staticmethod
    def create_meeting(access_token, meeting_data):
        """Create a Zoom meeting"""
        headers = {
            'Authorization': f'Bearer {access_token}',
            'Content-Type': 'application/json'
        }
        
        response = requests.post(
            f'{ZoomConfig.API_BASE_URL}/users/me/meetings',
            headers=headers,
            data=json.dumps(meeting_data)
        )
        
        if response.status_code == 201:
            return response.json()
        else:
            raise Exception(f"Zoom meeting creation error: {response.text}")
    
    @staticmethod
    def get_meeting(access_token, meeting_id):
        """Get meeting details"""
        headers = {
            'Authorization': f'Bearer {access_token}',
            'Content-Type': 'application/json'
        }
        
        response = requests.get(
            f'{ZoomConfig.API_BASE_URL}/meetings/{meeting_id}',
            headers=headers
        )
        
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Zoom meeting fetch error: {response.text}")