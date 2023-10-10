from django.contrib import admin
from .models import Conversation , PrivateConversation , Message , PrivateMessage
# Register your models here.

admin.site.register(Conversation)
admin.site.register(PrivateConversation)
admin.site.register(Message)
admin.site.register(PrivateMessage)