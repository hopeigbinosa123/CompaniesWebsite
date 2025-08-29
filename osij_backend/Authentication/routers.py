from rest_framework import routers
from Authentication.core_user.viewsets import UserViewSet
from Authentication.core_auth.viewsets import RegisterViewSet, LoginViewSet, RefreshViewSet
router= routers.SimpleRouter()

############
#####users ############

router.register(r'user', UserViewSet, basename = 'user')
#####AUTH
router.register(r'auth/register', RegisterViewSet, basename='auth_register')
router.register(r'auth/login', LoginViewSet, basename='auth_login')
router.register(r'auth/refresh', RefreshViewSet, basename='auth_refresh')

urlpatterns=[*router.urls]
