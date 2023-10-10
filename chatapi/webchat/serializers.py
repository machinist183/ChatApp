from rest_framework import serializers
from .models import Message , PrivateConversation , Conversation , PrivateMessage

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"
        read_only_fields = ['id', 'sender','created_at']
    
class ConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversation
        fields = "__all__"
        read_only_fields = ['id']

class PrivateMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrivateMessage
        fields = "__all__"
        read_only_fields = ['id','sender','receiver','created_at']
    
class PrivateConversationSerialzer(serializers.ModelSerializer):

    class Meta:
        model = PrivateConversation
        fields = "__all__"
        read_only_fields = ['id','user1','user2']
        
