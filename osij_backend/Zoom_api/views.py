from django.shortcuts import render

from django.shortcuts import render
import requests
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView

class ZoomAccessToken(APIView):
    def get(self, request):
        url = "https://zoom.us/oauth/token"
        payload = {
            "grant_type": "account_credentials",
            "account_id": settings.ZOOM_ACCOUNT_ID,
        }
        auth = (settings.ZOOM_CLIENT_ID, settings.ZOOM_CLIENT_SECRET)

        res = requests.post(url, data=payload, auth=auth)
        return Response(res.json())


class ZoomMeetings(APIView):
    def get(self, request):
        # Get token
        token_url = "https://zoom.us/oauth/token"
        token_payload = {
            "grant_type": "account_credentials",
            "account_id": settings.ZOOM_ACCOUNT_ID,
        }
        auth = (settings.ZOOM_CLIENT_ID, settings.ZOOM_CLIENT_SECRET)
        token_res = requests.post(token_url, data=token_payload, auth=auth)
        token = token_res.json().get("access_token")

        # Fetch meetings
        url = "https://api.zoom.us/v2/users/me/meetings"
        headers = {"Authorization": f"Bearer {token}"}
        res = requests.get(url, headers=headers)

        return Response(res.json())
