from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import permissions
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import (
    status,
    APIView,
)

from .serializers import (
    ChatSerializer,
    ChatDetailSerializer,
)

from chat.models import (
    get_current_chat,
    get_profile,
)

User = get_user_model()


class ChatDetailListView(APIView):
    """
    chat/chats/
    """
    permission_classes = (permissions.IsAuthenticated, )
    serializer_class = ChatDetailSerializer

    def post(self, request, *args, **kwargs):
        user_id = request.data.get("user_id", "")
        if not user_id:
            return Response(data={"message": "invalid user"}, status=status.HTTP_400_BAD_REQUEST)
        profile = get_profile(user_id)
        chats = self.serializer_class(profile.chats.all(), many=True, context={'profile_id': user_id})
        return Response({"chats": chats.data})


class ChatListView(APIView):
    """
    chat/list/
    """
    permission_classes = (permissions.IsAuthenticated, )
    serializer_class = ChatSerializer

    def post(self, request, *args, **kwargs):
        user_id = request.data.get("user_id", "")
        if not user_id:
            return Response(data={"message": "invalid user"}, status=status.HTTP_400_BAD_REQUEST)
        profile = get_profile(user_id)
        chats = ChatSerializer(profile.chats.all(), many=True)
        return Response({"chats": chats.data})


class ChatCreateView(APIView):
    """
    chat/create/
    """
    # permission_classes = (permissions.IsAuthenticated, )
    permission_classes = (permissions.AllowAny,)
    serializer_class = ChatSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            chat = serializer.create(validated_data=request.data)
            dataset = self.serializer_class(chat)
            return Response(
                status=status.HTTP_201_CREATED,
                data={
                    "chat": dataset.data
                })
        return Response(
            status=status.HTTP_400_BAD_REQUEST,
            data=serializer.error_messages,)


class ChatDetailView(APIView):
    """
    chat/<int:pk>
    """
    permission_classes = (permissions.IsAuthenticated, )
    serializer_class = ChatSerializer

    def post(self, request, *args, **kwargs):
        chat_id = kwargs.get('pk', '')
        if isinstance(chat_id, int):
            chat = get_current_chat(chat_id)
            profile = get_profile(request.user.profile.id)
            try:
                chat.participants.get(id=profile.id)
            except ObjectDoesNotExist:
                return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": 'You are not a participant for this chat'})
            serializer = self.serializer_class(chat)
            return Response(data={"chat": serializer.data})
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": 'invalid chat id'})


class ChatDeleteView(APIView):
    """
    chat/<pk>/delete/
    """
    serializer_class = ChatSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        chat_id = kwargs.get('pk', None)
        if chat_id is not None:
            chat = get_current_chat(chat_id)
            chat.delete()
            return Response(
                data={"message": "delete chat {}".format(chat_id)},
                status=status.HTTP_200_OK)
        return Response(
            data={"message": "chat id is None"},
            status=status.HTTP_400_BAD_REQUEST)


class ChatUpdateView(APIView):
    """
    chat/<pk>/update/
    """
    serializer_class = ChatSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        chat_id = kwargs.get('pk', None)
        return Response({"message": "hi update {}".format(chat_id)})
