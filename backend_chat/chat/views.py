import json
from django.utils.safestring import mark_safe
from rest_framework_jwt.settings import api_settings
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render

from .models import get_profile
# Get the JWT settings, add these lines after the import/from lines
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


def appFun(request):
    data = None
    if request.user.is_authenticated:
        token = jwt_encode_handler(jwt_payload_handler(request.user))
        try:
            profile = get_profile(request.user.profile.id)
            data = {
                'profile': {
                    'id': profile.id,
                    'avatar': '/media/{}'.format(profile.avatar),
                    'user': {
                        'username': request.user.username,
                        'email': request.user.email,
                        'last_name': request.user.last_name,
                        'first_name': request.user.first_name,
                    },
                },
                'token': token
            }
        except ObjectDoesNotExist:
            data = None
    return render(request, 'chat/app.html', {
        'auth': mark_safe(json.dumps(data)),
    })
