from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)


urlpatterns = [
    # API Schema and Documentation
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    # Optional UI:
    path(
        "api/schema/swagger-ui/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path(
        "api/schema/redoc/",
        SpectacularRedocView.as_view(url_name="schema"),
        name="redoc",
    ),
    path("admin/", admin.site.urls),
    path("api/education/", include("education.urls")),
    path("api/software-services/", include("software_services.urls")),
    path("api/cosmetology/", include("cosmetology.urls")),
    path("api/graphic-design/", include("graphic_design.urls")),
    # Authentication
    path("api/auth/", include("Authentication.urls")),
    # Payments
    path("api/payments/", include("payments.urls")),
    # Notifications and Contact
    path("api/notifications/", include("notifications.urls")),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Serve static files in production
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Frontend entry point
urlpatterns += [
    path("", TemplateView.as_view(template_name="index.html")),
]
