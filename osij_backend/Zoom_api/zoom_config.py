from django.conf import settings
import urllib.parse

class ZoomConfig:
    @staticmethod
    def get_auth_url(state):
        base_url = "https://zoom.us/oauth/authorize"
        params = {
            "response_type": "code",
            "client_id": settings.ZOOM_CLIENT_ID,
            "redirect_uri": settings.ZOOM_REDIRECT_URI,
            "state": state
        }
        return f"{base_url}?{urllib.parse.urlencode(params)}"
