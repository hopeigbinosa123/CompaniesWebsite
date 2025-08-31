from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from Zoom_api.views import ZoomMeeting, ZoomAccessToken

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/education/", include("education.urls")),
    path("api/software-services/", include("software_services.urls")),
    path("api/cosmetology/", include("cosmetology.urls")),
    path("api/graphic-design/", include("graphic_design.urls")),
    
    # TEMPORARILY COMMENTED OUT
    # path("api/auth/", include("authentication.urls")),
    
    path("api/zoom/meetings/", ZoomMeeting.as_view(), name="zoom-meetings"),
    path("api/zoom/access-token/", ZoomAccessToken.as_view(), name="zoom-access-token"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

urlpatterns += [
    path('', TemplateView.as_view(template_name='index.html')),
]