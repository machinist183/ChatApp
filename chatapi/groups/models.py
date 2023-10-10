from django.db import models
from webchat.models import Conversation
from account.validators import validate_image_file_exstension
from django.dispatch import receiver
from django.contrib.auth import get_user_model
import os
# Create your models here.

def icon_pic_upload_path(instance , filename):
    name , ext =  os.path.splitext(filename)
    return f"group/group_icons/{instance.group_name}_{name}{ext}"

def cover_pic_upload_path(instance , filename):
    name , ext =  os.path.splitext(filename)
    return f"group/cover_pics/{instance.group_name}_{name}{ext}"

class Group(models.Model):
    group_name = models.CharField( max_length=20 ,primary_key=True ,unique = True )
    owner = models.ForeignKey(get_user_model() , on_delete=models.DO_NOTHING , default= 51)
    conversation = models.OneToOneField( Conversation , on_delete= models.DO_NOTHING , null=True , blank = True)
    group_icon_pic = models.ImageField(upload_to=icon_pic_upload_path ,
                                        null=True ,
                                        blank=True ,
                                        validators=[validate_image_file_exstension])
    group_cover_pic = models.ImageField(upload_to=cover_pic_upload_path , 
                                        null=True ,
                                        blank=True,
                                        validators=[validate_image_file_exstension])
    info = models.TextField(max_length=1000 , null=True , blank=True)
    vibe = models.CharField(max_length=100 , null=True,blank=True)

    @receiver(models.signals.pre_delete , sender = 'groups.Group')
    def delete_user_file_on_delete(sender , instance , **kwargs):
        for field in instance._meta.fields:
            if field.name in ['group_icon_pic','group_cover_pic']:
                file = getattr(instance , field.name)
                if file:
                    file.delete(save=False)
    
    def __str__(self):
        return f'{self.group_name}'
