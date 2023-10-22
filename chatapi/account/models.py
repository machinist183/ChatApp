from django.db import models
from django.contrib.auth.models import BaseUserManager , AbstractBaseUser  , PermissionsMixin
from django.conf import settings
from .validators import validate_image_file_exstension
from django.shortcuts import get_object_or_404
from django.dispatch import receiver
import os

def profile_pic_upload_path(instance , filename):
    name , ext =  os.path.splitext(filename)
    return f"profile/profile_pics/{instance.user.username}{ext}"

def cover_pic_upload_path(instance , filename):
    name , ext =  os.path.splitext(filename)
    return f"profile/cover_pics/{instance.user.username}{ext}"

class UserManager(BaseUserManager):

    def create_user(self, username , email = None, password =None, **extra_fields):
        """Creates and saves a new user"""
        if not email:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError("Users must have valid username")
        user = self.model(username = username , email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username = None , email =None, password =None):
        """Creates and saves a new super user"""
        user = self.create_user(username , email, password)
        user.is_staff = True
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser , PermissionsMixin):

    username = models.CharField( max_length= 20, unique = True , blank=False , null=False)
    email = models.EmailField( unique=True ,blank=False , null=False )
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    
    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS =['email']

    def __str__(self):
        return self.username


@receiver(models.signals.post_save, sender='account.User')
def create_user_profile( sender , instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

class UserProfile(models.Model):

    user = models.OneToOneField( settings.AUTH_USER_MODEL , on_delete=models.CASCADE , primary_key=True , related_name='profile')
    about_me = models.TextField(max_length=1000)
    mood = models.CharField(max_length=100)
    friends = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True , related_name="friends")
    profile_pic = models.ImageField(upload_to=profile_pic_upload_path ,
                                    blank=True,
                                    null=True,
                                    validators=[validate_image_file_exstension],
                                    default='profile/profile_pics/default_profile.jpg')
    cover_pic = models.ImageField(upload_to=cover_pic_upload_path ,
                                    blank=True,
                                    null=True,
                                    validators=[validate_image_file_exstension])
    
    # def save(self , *args , **kwargs):
    #     if not self.id:
    #         super(UserProfile ,self).save(*args , *kwargs)
    #     existing = get_object_or_404(User,id = self.id)
    #     if existing.profile_pic != self.profile_pic:
    #         existing.profile_pic.delete(save = False)
    #     if existing.cover_pic != self.cover_pic:
    #         existing.cover_pic.delete(save = False)
    #     super(UserProfile ,self).save(*args , *kwargs)
      
    
    @receiver(models.signals.pre_delete , sender = 'account.User')
    def delete_user_file_on_delete(sender , instance , **kwargs):
        for field in instance._meta.fields:
            if field.name in ['profile_pic','cover_pic']:
                file = getattr(instance , field.name)
                if file:
                    file.delete(save=False)

    def __str__(self) :
        return self.user.username


