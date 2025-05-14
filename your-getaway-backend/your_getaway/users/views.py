# views.py
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate



@api_view(['POST'])
@csrf_exempt
def user_register(request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                token = Token.objects.create(user=user)
                json = serializer.data
                json['token'] = token.key
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
@api_view(['POST'])
@csrf_exempt
def user_login(request):
    user = authenticate(username=request.data['username'], password=request.data['password'])
    if user:
        token, created = Token.objects.get_or_create(user=user)
        return Response({'user':{request.data['username']},'role':user.role, 'token': token.key})
    else:
        return Response({'error': 'Invalid credentials'}, status=401)
