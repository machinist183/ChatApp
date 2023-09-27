from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from django.conf import settings
from .models import UserProfile

 
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        
        model = get_user_model()
        fields = ('username','password','email')
        extra_kwargs = {'password': {'write_only':True ,'min_length':8}}
    
    def create(self , validated_data):
        return get_user_model().objects.create_user(**validated_data)

    def update(self , instance, validated_data):
        password = validated_data.pop('password')
        user = super().update(instance , validated_data)
        if password:
            user.set_password(password)
            user.save()
        
        return user

    def to_representation(self, instance):
        return {'username': instance.username}

class ResetPasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model  = get_user_model()
        fields = ['password']
        extra_kwargs = {'password': {'write_only':True ,'min_length':8}}

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'
        read_only_fields = ['user' , 'friends']

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def get_token(cls, user):
        token = super().get_token(user)
        token["example"] = "example"
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data["username"] = self.user.id
        return data

class JWTCookieTokenRefreshSerializer(TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        attrs["refresh"] = self.context["request"].COOKIES.get(settings.SIMPLE_JWT["REFRESH_TOKEN_NAME"])

        if attrs["refresh"]:
            return super().validate(attrs)
        else:
            raise InvalidToken("No valid refresh token found")
