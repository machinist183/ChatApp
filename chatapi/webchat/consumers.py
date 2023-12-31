import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer
from django.db import models
from groups.models import Group
from .models import Message , PrivateConversation , PrivateMessage ,Conversation
from .serializers import MessageSerializer , ConversationSerializer
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
import datetime
from django.http import HttpRequest
from django.conf import settings

class GroupChatConsumer(JsonWebsocketConsumer):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.group_name = None
        self.group_group_name = None 
        self.group = None
        self.user = None

    def connect(self):
        try:

            group_name = self.scope['url_route']['kwargs']['group_name']  
            self.group_name = group_name.replace(" ", "_")
            self.user = self.scope["user"]
            if not self.user:
                self.accept()
                self.send_error("No user authentication found")
            self.accept()
            self.group_group_name = f'chat_{self.group_name}'
            if self.user.is_authenticated:
                self.group = Group.objects.get(group_name=group_name)
                async_to_sync(self.channel_layer.group_add)(
                    self.group_group_name,
                    self.channel_name,
                )
                print(self.channel_name)
            else:
                self.group_group_name = None
                self.send_error('User not authenticated')
        except Group.DoesNotExist:
            self.send_error(f"The group {group_name} doesn't exist")
        except Exception as e:
            self.send_error("Something went wrong ")

    def disconnect(self, close_code):
        try:
            async_to_sync(self.channel_layer.group_discard)(
                self.group_group_name,
                self.channel_name,
            )
            super().close()
        except Exception as e:
            self.send_error("Something went wrong")

    def receive_json(self, data):
        try:
            message = data['message']
            new_message = Message.objects.create(**message , sender = self.user , conversation = self.group.conversation)
            # for key , value in self.scope.items():
            #     print(key , value)
            serverDomain , port = self.scope['server']
            profile_pic_url = f'http://{serverDomain}:{str(port)}{new_message.sender.profile.profile_pic.url}'
            self.group.conversation.last_updated = datetime.datetime.now()
            self.group.conversation.save()
            async_to_sync(self.channel_layer.group_send)(
                self.group_group_name,
                {
                    "type": "chat_message",
                    'message':{
                        "id":new_message.id,
                        "content":new_message.content,
                        "sender":new_message.sender.id,
                        "profile_pic":profile_pic_url,
                        "sender_username":new_message.sender.username,
                        "created-at":new_message.created_at.isoformat(),
                        "is_reply":new_message.is_reply_to_another_message,
                    }
                }
            )
        except KeyError :
            self.send_error("The key message doesnt exists")
        except Exception as e:
            self.send_error(str(e))

    def chat_message(self, event):
        try:
            self.send(json.dumps(event))
        except json.decoder.JSONDecodeError:
            self.send_error("Please send the message in proper JSON format")
        except Exception as e:
            self.send_error(str(e))

    def send_error(self, error_message):
        self.send(text_data=json.dumps({
            'type': 'error',
            'message': error_message
        }))
        self.close()


class PrivateChatConsumer(JsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.group_privatechat_name = None 
        self.user = None
        self.conversation = None
        self.receiver = None

    def connect(self):
        try:
            receiver_username = self.scope['url_route']['kwargs']['receiver_user_name']  
            self.receiver = get_user_model().objects.get(username = receiver_username)
            self.user = self.scope["user"]
            if not self.user:
                self.accept()
                self.send_error("No user authentication found")
            if self.user.username >= self.receiver.username:
                user1, user2  = self.receiver , self.user
            else:
                user1 , user2 = self.user , self.receiver
            self.conversation , created = PrivateConversation.objects.get_or_create(user1 = user1, user2 = user2)
            self.accept()
            self.group_privatechat_name = f'private_chat_{self.conversation.user1}_{self.conversation.user2}'
            if self.user.is_authenticated:
                print("I am inside authentication section")
                async_to_sync(self.channel_layer.group_add)(
                    self.group_privatechat_name,
                    self.channel_name,
                )
            else:
                self.group_group_name = None
                self.send_error('User not authenticated')
        except get_user_model().DoesNotExist:
            self.accept()
            self.send_error(f"The receiver {receiver_username} does not exists")
        except Exception as e:
            self.send_error("Something went wrong ")

    def disconnect(self, close_code):
        try:
            async_to_sync(self.channel_layer.group_discard)(
                self.group_privatechat_name,
                self.channel_name,
            )
            super().close()
        except Exception as e:
            self.send_error("Something went wrong")

    def receive_json(self, data):
        try:
            message = data['message']
            new_message = PrivateMessage.objects.create(**message , sender = self.user, receiver = self.receiver, conversation = self.conversation)
            async_to_sync(self.channel_layer.group_send)(
                self.group_privatechat_name,
                {
                    "type": "chat_message",
                    'message':{
                        "id":new_message.id,
                        "content":new_message.content,
                        "sender":new_message.sender.id,
                        "receiver":new_message.receiver.id,
                        "created-at":new_message.created_at.isoformat(),
                        "is_reply":new_message.is_reply_to_another_message,
                    }
                }
            )
        except KeyError :
            self.send_error("The key message doesnt exists")
        except Exception as e:
            self.send_error(str(e))

    def chat_message(self, event):
        try:
            self.send(json.dumps(event))
        except json.decoder.JSONDecodeError:
            self.send_error("Please send the message in proper JSON format")
        except Exception as e:
            self.send_error(str(e))

    def send_error(self, error_message):
        self.send(text_data=json.dumps({
            'type': 'error',
            'message': error_message
        }))
        self.close()
