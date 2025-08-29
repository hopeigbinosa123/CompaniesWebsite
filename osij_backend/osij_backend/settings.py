"""
Django settings for osij_backend project.
"""

from pathlib import Path
import os
from datetime import timedelta  # ADD THIS FOR JWT

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
SECRET_KEY = "django-insecure-!zrm9!1tz$&1=*%4smqedc6^*149@)tj(^m^cz72fk3u-in)8u"
DEBUG = True
ALLOWED_HOSTS = []

# Application definition - FIXED: Removed non-existent apps
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    
    # Third-party apps
    "corsheaders",
    "rest_framework",
    "rest_framework_simplejwt",
    
    # Your apps - ONLY include apps that actually exist
    "education",
    "software_services",
    "cosmetology",
    "graphic_design",
    "Zoom_api",
    "Authentication"
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# FIXED: Corrected typo "Rest_FRAMEWORK" to "REST_FRAMEWORK"
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    # Remove this line if you don't have django_filters installed:
    # "DEFAULT_FILTER_BACKENDS": ["django_filters.rest_framework.DjangoFilterBackend"],
}

ROOT_URLCONF = "osij_backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "../osij-frontend/build")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "osij_backend.wsgi.application"

# Database
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# Static files
STATIC_URL = "static/"
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "../osij-frontend/build/static"),
]
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")

# Default primary key field type
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# CORS settings
# CORS settings
CORS_ALLOWED_ORIGINS = [
<<<<<<< Updated upstream
    "http://localhost:3000",
]

# JWT Settings - ADD THIS
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=24),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
}
=======
    "http://localhost:3000",  # Default React development server
    "http://127.0.0.1:3000",
]

CORS_ALLOW_CREDENTIALS = True



# JWT settings
from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
}

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.yourprovider.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'your@email.com'
EMAIL_HOST_PASSWORD = 'yourpassword'
DEFAULT_FROM_EMAIL = 'Course Platform <noreply@yourdomain.com>'
>>>>>>> Stashed changes

# Email settings (optional - you can comment these out if not needed)
# EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
# EMAIL_HOST = "smtp.yourprovider.com"
# EMAIL_PORT = 587
# EMAIL_USE_TLS = True
# EMAIL_HOST_USER = "your@email.com"
# EMAIL_HOST_PASSWORD = "yourpassword"
# DEFAULT_FROM_EMAIL = "Course Platform <noreply@yourdomain.com>"

# Zoom settings (optional - you can comment these out if not needed)
# ZOOM_CLIENT_ID = "your_client_id"
# ZOOM_CLIENT_SECRET = "your_client_secret"
# ZOOM_ACCOUNT_ID = "your_account_id"
# ZOOM_REDIRECT_URI = "http://localhost:8000/api/zoom/callback/"

# PayPal settings (optional)
# PAYPAL_TEST = True