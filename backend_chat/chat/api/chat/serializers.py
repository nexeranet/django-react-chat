from rest_framework import serializers
from django.db.models import Q
from chat.api.auth.serializers import (
    ProfileSerializer,
)

from chat.models import (
    Chat,
    Message,
    get_profile,
)


class ChatSerializer(serializers.ModelSerializer):
    participants = ProfileSerializer(many=True, required=False)

    class Meta:
        model = Chat
        fields = ('id', 'create_at', 'data', 'participants')
        read_only = ('id')

    def create(self, validated_data):
        users = validated_data.pop("users")
        data = validated_data.pop("datatext")
        chat = Chat(data=data)
        chat.save()
        for user in users:
            informer = get_profile(user)
            chat.participants.add(informer)
        return chat


class MessageSerializer(serializers.ModelSerializer):
    participant = ProfileSerializer()

    class Meta:
        model = Message
        fields = ('id', 'content', 'timestamp', 'participant')
        read_only = ('id')


class MessageSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('id', 'content', 'timestamp', 'participant')
        read_only = ('id')


class ChatDetailSerializer(serializers.ModelSerializer):

    # participants = ProfileSerializer(many=True, required=False)
    last_message = serializers.SerializerMethodField()
    participant = serializers.SerializerMethodField()

    class Meta:
        model = Chat
        fields = ('id', 'create_at', 'data', 'participants', 'last_message', 'participant')
        read_only = ('id')

    def get_participant(self, obj):
        profile_id = self.context.get("profile_id")
        participant = obj.participants.filter(~Q(id=profile_id)).first()
        return ProfileSerializer(participant).data

    def get_last_message(self, obj):
        msg = obj.messages.order_by('-timestamp').first()
        if msg is None:
            return None
        serializer = MessageSerializer(msg)
        return serializer.data
