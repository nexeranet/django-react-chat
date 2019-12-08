from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from django.db import models

User = get_user_model()


class GetOrNoneManager(models.Manager):
    """Adds get_or_none method to objects
    """
    def get_or_none(self, **kwargs):
        try:
            return self.get(**kwargs)
        except self.model.DoesNotExist:
            return None


class Profile(models.Model):
    objects = GetOrNoneManager()
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(default='default.png', blank=True, upload_to='profile_pic')
    friends = models.ManyToManyField('self', blank=True)


class Message(models.Model):
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    participant = models.ForeignKey(Profile, related_name='messages', on_delete=models.CASCADE)

    def __str__(self):
        return self.content


class Chat(models.Model):
    data = models.TextField(default="your chat")
    create_at = models.DateTimeField(auto_now_add=True)
    private = models.BooleanField(default=False)
    direct_message = models.BooleanField(default=True)
    participants = models.ManyToManyField(Profile, related_name='chats', blank=True)
    messages = models.ManyToManyField(Message, blank=True)

    def __str__(self):
        return self.data


def get_current_chat(chat_id):
    return get_object_or_404(Chat, id=chat_id)


def get_last_10_messages(chatId):
    chat = get_object_or_404(Chat, id=chatId)
    return chat.messages.order_by('-timestamp').all()[:15]


def get_profile(profile_id):
    return get_object_or_404(Profile, id=profile_id)
