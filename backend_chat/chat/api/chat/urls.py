from django.urls import path

from .views import (
    ChatCreateView,
    ChatDetailListView,
    ChatListView,
    ChatDetailView,
    ChatDeleteView,
    ChatUpdateView,
)

urlpatterns = [
    path('chat/list/', ChatListView.as_view(), name="list-chats"),
    path('chat/chats/', ChatDetailListView.as_view(), name="detail-chats"),
    path('chat/<int:pk>', ChatDetailView.as_view(), name="detail-chat"),
    path('chat/<int:pk>/update/', ChatUpdateView.as_view(), name="update-chat"),
    path('chat/<int:pk>/delete/', ChatDeleteView.as_view(), name="delete-chat"),
    path('chat/create/', ChatCreateView.as_view(), name="create-chat"),
]
