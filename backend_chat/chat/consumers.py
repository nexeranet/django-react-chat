# chat/consumers.py
import json
from asgiref.sync import async_to_sync
from django.contrib.auth import get_user_model
from channels.generic.websocket import WebsocketConsumer
from .models import (
    Message,
    get_last_10_messages,
    get_current_chat,
    get_profile,
)

from .api.chat.serializers import MessageSerializer

User = get_user_model()


class ChatConsumer(WebsocketConsumer):

    def fetch_messages(self, data):
        messages = get_last_10_messages(data['chatId'])
        content = {
            'command': 'messages',
            'messages': self.messages_to_json(messages)
        }
        self.send_message(content)

    def new_message(self, data):
        current_chat = get_current_chat(data['chat_id'])
        profile = get_profile(data['sender_id'])
        message = Message.objects.create(
            participant=profile,
            content=data['message'],
        )
        current_chat.messages.add(message)
        current_chat.save()
        msg = MessageSerializer(message)
        content = {
            'command': 'new_message',
            'message': msg.data
        }
        return self.send_chat_message(content)

    def messages_to_json(self, messages):
        result = MessageSerializer(messages, many=True)
        return result.data

    commands = {
        'fetch_messages': fetch_messages,
        'new_message': new_message
    }

    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        data = json.loads(text_data)
        self.commands[data['command']](self, data)

    def send_chat_message(self, message):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    def send_message(self, message):
        self.send(text_data=json.dumps(message))

    def chat_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps(message))
