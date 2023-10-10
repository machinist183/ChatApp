from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated , AllowAny
from .models import Group
from .serializers import GroupSerializer
from django.contrib.auth import get_user_model
from webchat.models import Conversation
from .permissions import IsOwnerOrReadOnly

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    
    def get_permissions(self):

        if self.action in ["create" , "update" , "partial_update" , "destroy"]:
            return [IsAuthenticated() , IsOwnerOrReadOnly()]
        return [AllowAny()]


    def perform_create(self, serializer):
        group = serializer.save(owner = self.request.user)
        # Create a new conversation and associate it with the group
        conversation = Conversation.objects.create()
        group.conversation = conversation
        group.save()
    
    # def create(self , request , *args , **kwargs):
    #     response = super().create(request, *args, **kwargs)
    #     group = self.get_object()

    #     conversation = Conversation.objects.create()
    #     group.conversation = conversation
    #     group.save()

    #     return response
        

