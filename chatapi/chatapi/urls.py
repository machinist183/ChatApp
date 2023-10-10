"""chatapi URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
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
from django.urls import path , include 
from django.conf import settings
from django.conf.urls.static import static
from account.views import (
                           JWTCookieTokenObtainPairView,
                           JWTCookieTokenRefreshView,
                           LogOutAPIView,)

from rest_framework.routers import DefaultRouter
from webchat.consumers import GroupChatConsumer , PrivateChatConsumer
from webchat.views import MessageListView , PrivateMessageListView

router = DefaultRouter()
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/' , include('account.urls')),
    path('api/' , include('groups.urls')),
    path('api/<str:group_name>/messages/',MessageListView.as_view() , name="message_list"),
    path('api/privatemessages/<str:second_user>/',PrivateMessageListView.as_view() , name="private_message_list"),
    path("api/token/", JWTCookieTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", JWTCookieTokenRefreshView.as_view(), name="token_refresh"),
    path("api/logout/", LogOutAPIView.as_view(), name="logout"),
] + router.urls

websocket_urlpatterns =  [path('ws/groupchat/<str:group_name>',GroupChatConsumer.as_asgi()),
                          path('ws/privatechat/<str:receiver_user_name>' ,PrivateChatConsumer.as_asgi() )]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
