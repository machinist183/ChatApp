from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from django.conf import settings
from .models import UserProfile
from django.core.validators import MinLengthValidator


 
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

    old_password = serializers.CharField(write_only=True, required=True, validators=[MinLengthValidator(limit_value=8)])

    class Meta:
        model  = get_user_model()
        fields = ['old_password', 'password']
        extra_kwargs = {
            'password': {'write_only': True, 'min_length': 8},
            'old_password':{'write_only':True , 'min_length':8}
        }
    
    def validate_old_password(self , value):

        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError('The password you have provided is incorrect')
        return value



class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'
        read_only_fields = ['user' , 'friends']
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['username'] = instance.user.username
        return representation

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def get_token(cls, user):
        token = super().get_token(user)
        token["example"] = "example"
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data["user_id"] = self.user.id
        return data

class JWTCookieTokenRefreshSerializer(TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        attrs["refresh"] = self.context["request"].COOKIES.get(settings.SIMPLE_JWT["REFRESH_TOKEN_NAME"])

        if attrs["refresh"]:
            return super().validate(attrs)
        else:
            raise InvalidToken("No valid refresh token found")
