from .auth.urls import urlpatterns as auth_urls
from .chat.urls import urlpatterns as chat_urls
from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token
app_name = 'chat'

tokenurls = [
    path('token', obtain_jwt_token),
    path('token-refresh', refresh_jwt_token),
]
urlpatterns = auth_urls + tokenurls + chat_urls
