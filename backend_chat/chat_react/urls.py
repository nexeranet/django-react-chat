# mysite/urls.py
from django.urls import path, re_path
from django.contrib import admin
from django.conf.urls import url, include
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from chat.views import appFun
urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls')),
    path('api/', include('chat.api.urls')),
    re_path(r'^.*', appFun),
]
