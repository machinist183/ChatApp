from rest_framework import serializers
from .models import Group

class GroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = Group
        fields = "__all__"
        read_only_fields = ['owner','conversation']
    
    def update(self, instance, validated_data):
        # Ensure that group_name is not being updated
        validated_data.pop('group_name', None)
        return super().update(instance, validated_data)