from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/education/", include("education.urls")),
    path("api/software-services/", include("software_services.urls")),
    path("api/cosmetology/", include("cosmetology.urls")),
    path("api/graphic-design/", include("graphic_design.urls")),
    
    # Authentication
    path("api/auth/", include("Authentication.urls")),

    # Payments
    path("api/payments/", include("payments.urls")),
]

# Static/media files in debug mode
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Frontend entry point
urlpatterns += [
    path('', TemplateView.as_view(template_name='index.html')),
]
