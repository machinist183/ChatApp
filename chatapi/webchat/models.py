from django.db import models
from django.contrib.auth import get_user_model



class PrivateConversation(models.Model):

    user1 = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='user1_private_conversation')
    user2 = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='user2_private_conversation')

    def save(self, *args, **kwargs):
   
        if self.user1.username >= self.user2.username:
            self.user1, self.user2 = self.user2, self.user1
           
        super(PrivateConversation, self).save(*args, **kwargs)

    class Meta:
        unique_together = ('user1', 'user2')
    
    def __str__(self) -> str:
        return f"conversation_{self.user1.username}_{self.user2.username}"

class Conversation(models.Model):
    
    last_updated = models.DateTimeField(null= True , blank=True)

    def __str__(self) -> str:
        return f"{self.group}_conversation"

class Message(models.Model):
    sender = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    content = models.TextField()
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE , related_name="messages")
    created_at = models.DateTimeField(auto_now_add=True)
    is_reply_to_another_message = models.BooleanField(default=False)
    reply_to_message = models.OneToOneField('self', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f'Message {self.id}'

class PrivateMessage(models.Model):

    sender = models.ForeignKey(get_user_model(), on_delete=models.CASCADE , related_name='sent_messages')
    receiver = models.ForeignKey(get_user_model() , on_delete=models.CASCADE , related_name="received_messages")
    content = models.TextField()
    conversation = models.ForeignKey(PrivateConversation, on_delete=models.CASCADE , related_name="messages")
    created_at = models.DateTimeField(auto_now_add=True)
    is_reply_to_another_message = models.BooleanField(default=False)
    reply_to_message = models.OneToOneField('self', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self) -> str:
        return f"{self.content}"
    





