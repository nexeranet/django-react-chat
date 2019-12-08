from django.urls import path
from .views import (
    LoginView,
    RegisterUsers,
    ResetPassView,
    UserListAPIView,
    LogoutView,
    ProfileView,
)

urlpatterns = [
    path('auth/users/', UserListAPIView.as_view(), name="user-list"),
    path('auth/login/', LoginView.as_view(), name="auth-login"),
    path('auth/register/', RegisterUsers.as_view(), name="auth-register"),
    path('auth/reset-password/', ResetPassView.as_view(), name="auth-reset-password"),
    path('auth/logout/', LogoutView.as_view(), name="auth-logout"),
    path('auth/search-profiles/', ProfileView.as_view(), name="auth-logout"),
]
