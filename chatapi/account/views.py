from .serializers import (UserSerializer ,
                          CustomTokenObtainPairSerializer,
                          JWTCookieTokenRefreshSerializer,
                          ResetPasswordSerializer,
                          UserProfileSerializer)
from .models import UserProfile
from rest_framework import viewsets , status
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.conf import settings
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated , AllowAny
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.parsers import MultiPartParser
from django.http import JsonResponse
import json

class UserViewSet(viewsets.ModelViewSet):
 
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

    def get_serializer_class(self):
        if self.action == 'reset_password':
            return ResetPasswordSerializer
        return super().get_serializer_class()
    
    def get_permissions(self):
        if self.action == "create":
            return [AllowAny(),]
        return [IsAuthenticated(),]
    

    @action(detail=True, methods=['put'])
    def reset_password(self, request, pk=None):
        user = request.user
        if user.id != int(pk) :
            return Response(f'Youre not allowed to perform this action' , status.HTTP_403_FORBIDDEN)
        serializer = self.get_serializer(data = request.data)
        if serializer.is_valid():
            password = serializer.validated_data['password']
            user.set_password(password)
            user.save()
            return Response(f"Password successfullly changed" , status.HTTP_200_OK)
        errors = serializer.errors
        response = {}
        for key , value in errors.items():
            response[key] = value[0]

        return Response(response, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, **kwargs):
        return Response("Method Not Allowed", status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def partial_update(self, request, *args, **kwargs):
        return Response("Method Not Allowed", status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def destroy(self, request, pk=None, **kwargs):
        if request.user.id == int(pk):
            user = self.get_object()  
            self.perform_destroy(user)  
            response = Response("Your account has been deleted successfully" ,status.HTTP_204_NO_CONTENT)
            response.delete_cookie("refresh_token")
            response.delete_cookie("access_token")
            return response
        return Response(f'You are not allowed to perform this action', status=status.HTTP_403_FORBIDDEN)

class UserProfileViewset(viewsets.ModelViewSet):

    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def create(self , *args , **kwargs):
        return Response("Method Not Allowed", status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    def destroy(self , *args , **kwargs):
        return Response("Method Not Allowed", status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def partial_update(self  , request , pk = None , *args , **kwargs):
        profile = self.get_object()
        if request.user == profile.user:
            return super().partial_update( request , pk = pk , *args , **kwargs)
        return Response(f'You are not allowed to perform this action', status=status.HTTP_403_FORBIDDEN)
    
class LogOutAPIView(APIView):
    def post(self, request, format=None):
        response = Response("Logged out successfully")
        response.set_cookie("refresh_token", "", expires=0)
        response.set_cookie("access_token", "", expires=0)
        return response

class JWTSetCookieMixin:
    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get("refresh"):
            response.set_cookie(
                settings.SIMPLE_JWT["REFRESH_TOKEN_NAME"],
                response.data["refresh"],
                max_age=settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"],
                httponly=True,
                samesite=settings.SIMPLE_JWT["JWT_COOKIE_SAMESITE"],
            )
        if response.data.get("access"):
            response.set_cookie(
                settings.SIMPLE_JWT["ACCESS_TOKEN_NAME"],
                response.data["access"],
                max_age=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
                httponly=True,
                samesite=settings.SIMPLE_JWT["JWT_COOKIE_SAMESITE"],
            )

        return super().finalize_response(request, response, *args, **kwargs)


class JWTCookieTokenObtainPairView(JWTSetCookieMixin, TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class JWTCookieTokenRefreshView(JWTSetCookieMixin, TokenRefreshView):
    serializer_class = JWTCookieTokenRefreshSerializer