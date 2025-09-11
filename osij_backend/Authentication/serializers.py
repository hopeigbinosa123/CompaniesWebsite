from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

User = get_user_model()
 # handles user serialization
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name', 'phone_number')
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
            'phone_number': {'required': False}
        }
    # handles email validation 
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value
    # handles user creation
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))
        return super().create(validated_data)

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, style={'input_type': 'password'})
    # handles user login
    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
    
        if not username or not password:
           raise serializers.ValidationError("Both username and password are required.")
    
        user = User.objects.filter(username=username).first() # handles user login
        if not user or not user.check_password(password):
          raise serializers.ValidationError("Invalid credentials.")
    
        # Add user to the validated data
        data['user'] = user
        return data