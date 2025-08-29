"""
URL configuration for osij_backend project.
"""

from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView  # ADD THIS IMPORT
from django.conf import settings
from django.conf.urls.static import static
from Zoom_api.views import ZoomMeetings, ZoomAccessToken

urlpatterns = [
    path("admin/", admin.site.urls),
    # API endpoints
    path("api/education/", include("education.urls")),
    path("api/software-services/", include("software_services.urls")),
    path("api/cosmetology/", include("cosmetology.urls")),
    path("api/graphic-design/", include("graphic_design.urls")),
    # Authentication
    path("api/auth/", include("Authentication.urls")),
    # Zoom API
    path("api/zoom/meetings/", ZoomMeetings.as_view(), name="zoom-meetings"),
    path("api/zoom/access-token/", ZoomAccessToken.as_view(), name="zoom-access-token"),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Catch-all route for React - MUST BE LAST
urlpatterns += [
    path("", TemplateView.as_view(template_name="index.html")),
]
