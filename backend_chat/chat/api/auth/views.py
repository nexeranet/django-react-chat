from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.settings import api_settings
from rest_framework import permissions
from rest_framework import generics
from rest_framework.views import status
from django.contrib.auth import logout

from chat.models import (
    get_profile,
    Profile,
)


from .serializers import (
    UserSerializer,
    TokenSerializer,
    ChangePasswordSerializer,
    ProfileSerializer,
)


jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


class UserListAPIView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)


class LoginView(APIView):
    """
    POST auth/login/
    """

    permission_classes = (permissions.AllowAny,)
    queryset = User.objects.all()
    serializer_class = ProfileSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get("username", "")
        password = request.data.get("password", "")
        print('hi')
        user = authenticate(request, username=username, password=password)
        print(user)
        if user is not None:
            profile = get_profile(user.profile.id)
            login(request, user)
            if profile:
                user_data = self.serializer_class(profile)
                token = TokenSerializer(data={
                    "token": jwt_encode_handler(
                        jwt_payload_handler(user)
                    ),
                })
                token.is_valid()
                data = {
                    "profile": user_data.data,
                    "token": token.data['token'],
                }
                return Response(data)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class RegisterUsers(generics.CreateAPIView):
    """
    POST auth/register/
    """
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        user = self.serializer_class(data=request.data)
        if user.is_valid(raise_exception=ValueError):
            new_user = user.create(validated_data=request.data)
            profile_model = user.get_profile()
            profile = ProfileSerializer(profile_model)
            login(request, new_user)
            token = TokenSerializer(data={
                "token": jwt_encode_handler(
                    jwt_payload_handler(new_user)
                ),
            })
            token.is_valid()
            dataset = {
                "profile": profile.data,
                "token": token.data['token'],
            }
            return Response(
                data=dataset,
                status=status.HTTP_201_CREATED
            )
        return Response(
            user.error_messages,
            status=status.HTTP_400_BAD_REQUEST
        )


class ResetPassView(generics.CreateAPIView):
    """
    PUT auth/reset-password/
    """

    # permission_classes = (permissions.AllowAny,)
    permission_classes = (permissions.IsAuthenticated,)
    model = User
    queryset = User.objects.all()
    serializer_class = ChangePasswordSerializer

    def get(self, request, *args, **kwargs):
        return Response({
            "username": request.user.username
        })

    def get_object(self, queryset=None):
        return self.request.user

    def put(self, request, *args, **kwargs):
        self.object = self.get_object()
        print(request.data)
        serializer = self.serializer_class(data=request.data)
        print(serializer.is_valid(), serializer.errors)
        if serializer.is_valid():
            # Check old password
            old_password = serializer.data.get("old_password")
            if not self.object.check_password(old_password):
                return Response({"old_password": ["Wrong password."]},
                                status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(generics.CreateAPIView):
    """
    GET auth/logout/
    """

    permission_classes = (permissions.AllowAny,)
    model = User
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        logout(request)
        return Response({
            "username": request.user.username
        })


class ProfileView(APIView):
    """
    GET auth/search-profiles/
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        username = request.data.get("username", "")
        users = User.objects.filter(username__icontains=username)
        data = []
        for user in users:
            profile = Profile.objects.get_or_none(user=user)
            if profile is not None:
                serializer = ProfileSerializer(user.profile)
                data.append(serializer.data)
        return Response({
            "profiles": data
        })
