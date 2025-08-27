"""
URL configuration for osij_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include, re_path  # Added
from django.views.generic import TemplateView
from Authentication.paypal.views import payment_view
from Authentication.zoom_api.views import ZoomMeetings, ZoomAccessToken

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/education/", include("education.urls")),  # Added
    path("api/software_services/", include("software_services.urls")),  # Added
    path("api/cosmetology/", include("cosmetology.urls")),  # Added
    path("api/graphic_design/", include("graphic_design.urls")),  # Added
    path(
        "api/auth/", include("Authentication.routers")
    ),  # Updated to include Authentication URLs
    path("api/auth/paypal/", payment_view, name="paypal_ipn"),
    path("api/auth/Zoom/", ZoomMeetings.as_view(), name="zoom_api"),
    path(
        "api/auth/ZoomAccessToken/", ZoomAccessToken.as_view(), name="zoom_access_token"
    ),
    re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
]

