from django.shortcuts import render
from .models import Conversation , Message , PrivateMessage ,PrivateConversation
from groups.models import Group
from .serializers import MessageSerializer , PrivateMessageSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status , views
from django.db.models import Q , Max , OuterRef , Subquery ,When,Case,CharField,Value
from django.conf import settings
from django.contrib.auth import get_user_model



# Create your views here.

class MessageListView(views.APIView):

    def get(self , request , *args , **kwargs):
        group_name = kwargs["group_name"]
        try:
            group = Group.objects.get(group_name = group_name)
            messages = group.conversation.messages.all().order_by('created_at')
            serializer = MessageSerializer(messages , many= True , context={'request':request})
            return Response(serializer.data , status.HTTP_200_OK)
        except Exception as e:
            return Response(str(e) , status.HTTP_404_NOT_FOUND)

class PrivateMessageListView(views.APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request , *args , **kwargs):
        second_user_id = int(kwargs["second_user"])
        
        try:
            second_user = get_user_model().objects.get(id = second_user_id)
            print(second_user)
            if request.user.is_authenticated:
                user1 , user2 = request.user.username , second_user.username
                if user1 > user2 :
                    user1 , user2 = user2 , user1
                conversation = PrivateConversation.objects.get(user1__username= user1 , user2__username= user2)
                if conversation:
                    serializer = PrivateMessageSerializer(conversation.messages.all() , many=True)
                    return Response(serializer.data , status.HTTP_200_OK)
        except PrivateConversation.DoesNotExist:
            return Response([] , status.HTTP_200_OK)
        except Exception as e:
            return Response(str(e) , status.HTTP_400_BAD_REQUEST)
        
class GetUserPrivateConversations(views.APIView):

    permission_classes = [IsAuthenticated]

    def get(self , request , *args , **kwargs):
        user = request.user

        other_user_username = Case(
            When(user1=user, then='user2__username'),
            When(user2=user, then='user1__username'),
            default=Value('Unknown'),  # You can set a default value if needed
            output_field=CharField()   # Specify the output field type
        )
        other_user_profile_pic = Case(
            When(user1=user, then='user2__profile__profile_pic'),
            When(user2=user, then='user1__profile__profile_pic'),
            default=Value('default_profile_pic.jpg'),  # Provide a default value if needed
            output_field=CharField()   # Specify the output field type
        )
        other_user_id = Case(
            When(user1=user, then='user2__id'),
            When(user2=user, then='user1__id'),  # Provide a default value if needed
            output_field=CharField()   # Specify the output field type
        )
        latest_messages_subquery = PrivateMessage.objects.filter(
            conversation=OuterRef('id')
            ).values("content").order_by("-created_at")[:1]
        
        conversations = PrivateConversation.objects.filter(
            Q(user1=user) | Q(user2=user)
        ).annotate(latest_message_content=Subquery(latest_messages_subquery),
                    username=other_user_username,
                    profile_pic =other_user_profile_pic,
                    user_id = other_user_id)\
            .values('id', 'user_id','username','profile_pic','latest_message_content',)\
        
        conversations = conversations.exclude(latest_message_content=None)

        for conversation in conversations:
            conversation['profile_pic'] = request.build_absolute_uri(settings.MEDIA_URL + conversation['profile_pic'])
        
        return Response(conversations , status = status.HTTP_200_OK)
    
class GetUserGroupConversations(views.APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user

        conversations = Conversation.objects.filter(
                            messages__sender=user
                        ).distinct().annotate(
                            latest_message_content=Subquery(
                                Message.objects.filter(
                                    conversation=OuterRef('id')
                                ).order_by('-created_at').values('content')[:1]
                            )
                        ).values("id","group","group__group_icon_pic", "last_updated","latest_message_content").order_by("-last_updated")

        conversations = conversations.exclude(latest_message_content=None)
        
        for conversation in conversations:
            conversation['icon_pic'] = request.build_absolute_uri(settings.MEDIA_URL + conversation['group__group_icon_pic'])
    
        return Response(conversations)




    
        

    
    



            


