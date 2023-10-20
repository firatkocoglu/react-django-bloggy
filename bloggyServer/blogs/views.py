from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


# SESSION BASED AUTHENTICATION VIEWS - LOGIN AND LOGOUT
@api_view(['POST'])
@csrf_exempt
def login_view(request):
        username = request.data['username']
        password = request.data['password']
        
        if not username:
            return Response({'detail': 'Please provide a username.'}, status=status.HTTP_401_UNAUTHORIZED)    
        
        if not password:
            return Response({'detail': 'Please provide your password.'}, status=status.HTTP_401_UNAUTHORIZED)
        
        user = authenticate(username=username, password=password)
        
        if not user:
            return Response({'detail': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
        
        login(request, user)
        return Response({'detail': 'Successfully logged in.'}, status=status.HTTP_200_OK)
    
@api_view(['GET'])
@csrf_exempt
def logout_view(request):
    print(request.user)
    
    if not request.user.is_authenticated:
        return Response({'detail': 'Not authorized.'}, status=status.HTTP_401_UNAUTHORIZED)
    
    logout(request)
    return Response({'detail': 'Successfully logged out.'}, status=status.HTTP_200_OK)
# SESSION BASED AUTHENTICATION VIEWS - LOGIN AND LOGOUT


# BLOG OPERATIONS VIEWS

# BLOG OPERATIONS VIEWS
