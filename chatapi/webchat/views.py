from django.shortcuts import render
from .models import Conversation , Message , PrivateMessage ,PrivateConversation
from groups.models import Group
from .serializers import MessageSerializer , PrivateMessageSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status , views
# Create your views here.

class MessageListView(views.APIView):

    def get(self , request , *args , **kwargs):
        group_name = kwargs["group_name"]
        try:
            group = Group.objects.get(group_name = group_name)
            messages = group.conversation.messages.all().order_by('-created_at')
            serializer = MessageSerializer(messages , many= True)
            return Response(serializer.data , status.HTTP_200_OK)
        except Exception as e:
            return Response(str(e) , status.HTTP_404_NOT_FOUND)

class PrivateMessageListView(views.APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request , *args , **kwargs):
        second_user = kwargs["second_user"]
        try:
            print("i am inside")
            if request.user.is_authenticated:
                user1 , user2 = request.user.username , second_user
                if user1 > user2 :
                    user1 , user2 = user2 , user1
                print("above convo")
                conversation = PrivateConversation.objects.filter(user1__username= user1 , user2__username= user2)[0]
                print("ogt conv")
                print(conversation.user1)
                if conversation:
                    serializer = PrivateMessageSerializer(conversation.messages.all() , many=True)
                    return Response(serializer.data , status.HTTP_200_OK)
        except Exception as e:
            return Response(str(e) , status.HTTP_400_BAD_REQUEST)


            


