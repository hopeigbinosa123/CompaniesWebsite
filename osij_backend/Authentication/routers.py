from rest_framework import routers
from Authentication.core_user.viewsets import UserViewSet
from Authentication.core_auth.viewsets import RegisterViewSet, LoginViewSet, RefreshViewSet
router= routers.SimpleRouter()
from Authentication.paypal.views import payment_view
from Authentication.zoom_api.views import ZoomMeetings, ZoomAccessToken
############
#####users ############

router.register(r'user', UserViewSet, basename = 'user')
#####AUTH
router.register(r'auth/register', RegisterViewSet, basename='auth_register')
router.register(r'auth/login', LoginViewSet, basename='auth_login')
router.register(r'auth/refresh', RefreshViewSet, basename='auth_refresh')
router.register(r'paypal/', payment_view, basename='paypal_ipn')
router.register(r'Zoom/',ZoomMeetings , basename='zoom_api')
router.register(r'ZoomAccessToken/', ZoomAccessToken, basename='zoom_access_token')
urlpatterns=[*router.urls]
