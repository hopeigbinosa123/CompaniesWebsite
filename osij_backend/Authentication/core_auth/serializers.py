from rest_framework import serializers
from Authentication.core_user.serializers import UserSerializer
from Authentication.core_user.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth.models import update_last_login

class RegisterSerializer(UserSerializer):
    """Registration serializer for creating new users."""

    #Make sure the password  is at least 8 characters long and no longer than 128 characters
    password = serializers.CharField(max_length=128, min_length=8, write_only=True, required=True)

    class Meta:
        model = User
        # List all the fields that can bed included in a request or a response
        fields = UserSerializer.Meta.fields + ['id','bio', 'avatar', 'email', 'username','first_name', 'last_name',  'password']
    
    def create(self, validated_data):
        # use the `create user` method to  create a new user by UserManager
        return User.objects.create_user(**validated_data)
    
class LoginSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
    
        refresh = self.get_token(self.user)

        data['user']= UserSerializer(self.user).data
        data['refresh']=str(refresh)
        data['access']=str(refresh.access_token)

        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data    