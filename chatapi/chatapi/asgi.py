"""
ASGI config for chatapi project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/asgi/
"""

import os
from . import urls
from channels.routing import ProtocolTypeRouter , URLRouter
from django.core.asgi import get_asgi_application
from webchat.middleware import JWTAuthMiddleWare

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chatapi.settings')

django_application = get_asgi_application()

application = ProtocolTypeRouter({
  'http': get_asgi_application(),
  'websocket': JWTAuthMiddleWare(URLRouter(urls.websocket_urlpatterns)),
})
