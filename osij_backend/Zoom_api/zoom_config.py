# zoom_api/zoom_config.py
import os
from django.conf import settings

class ZoomConfig:
    # OAuth Credentials
    CLIENT_ID = os.getenv('ZOOM_CLIENT_ID', 'your_client_id_here')
    CLIENT_SECRET = os.getenv('ZOOM_CLIENT_SECRET', 'your_client_secret_here')
    REDIRECT_URI = os.getenv('ZOOM_REDIRECT_URI', 'http://localhost:8000/api/zoom/callback/')
    ACCOUNT_ID = os.getenv('ZOOM_ACCOUNT_ID', 'your_account_id_here')  # For server-to-server
    
    # API Endpoints
    AUTH_URL = 'https://zoom.us/oauth/authorize'
    TOKEN_URL = 'https://zoom.us/oauth/token'
    API_BASE_URL = 'https://api.zoom.us/v2'
    
    # Scopes
    SCOPES = [
        'meeting:write',
        'meeting:read', 
        'user:read',
        'recording:read'
    ]
    
    @classmethod
    def get_auth_url(cls, state=None):
        params = {
            'response_type': 'code',
            'client_id': cls.CLIENT_ID,
            'redirect_uri': cls.REDIRECT_URI,
            'scope': ' '.join(cls.SCOPES)
        }
        if state:
            params['state'] = state
            
        from urllib.parse import urlencode
        return f"{cls.AUTH_URL}?{urlencode(params)}"