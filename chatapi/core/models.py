# from django.db import models

# class Conversation(models.Model):
#     is_private = models.BooleanField()
#     messages = models.ManyToManyField('Message', related_name='conversations', blank=True)


# class Group(models.Model):
#     conversation = models.OneToOneField(Conversation, on_delete=models.CASCADE)
#     profile_pic = models.ImageField(upload_to='group_profile_pics/')
#     cover_pic = models.ImageField(upload_to='group_cover_pics/')
#     info = models.TextField()
#     vibe = models.CharField(max_length=100)
#     members = models.ManyToManyField(User)

#     def __str__(self):
#         return f'Group {self.id}'

# class Message(models.Model):
#     content = models.TextField()
#     sender = models.ForeignKey(User, on_delete=models.CASCADE)
#     conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE)
#     created_at = models.DateTimeField(auto_now_add=True)
#     is_reply_to_another_message = models.BooleanField(default=False)
#     reply_to_message = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)

#     def __str__(self):
#         return f'Message {self.id}'

# class BlockedUsers(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     blocked_user = models.ForeignKey(User, related_name='blocked_by', on_delete=models.CASCADE)

#     def __str__(self):
#         return f'{self.user.username} blocked {self.blocked_user.username}'


