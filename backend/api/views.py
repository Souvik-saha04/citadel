from django.contrib.auth import authenticate
from rest_framework.decorators import api_view,permission_classes
from rest_framework_simplejwt.tokens import RefreshToken,TokenError
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status
from .models import *
from rest_framework.permissions import AllowAny
from django.db import transaction
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse


# Create your views here.

@api_view(['POST'])
@permission_classes([AllowAny])
def handleLogin(request):
    username=request.data.get('username')
    password=request.data.get('password')
    user=authenticate(username=username,password=password)
    if user is not None:
        refresh=RefreshToken.for_user(user)
        return Response(
            {
                "message":"account logged in successfully",
                "refresh":str(refresh),
                "access":str(refresh.access_token)
            },
            status=status.HTTP_200_OK
        )
    else:
        return Response({"message": "Invalid username or password"},status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes([AllowAny])
@transaction.atomic
def handleRegistration(request):
    data=request.data
    required_fields=['username','email' ,'first_name' ,'last_name' ,'phone' ,'address' ,'city' ,'pincode' ,'password' ]
    for field in required_fields:
        if not data.get(field):
            return Response({'error':f'Field {field} is required'},status=status.HTTP_400_BAD_REQUEST)

    if(User.objects.filter(username=data['username']).exists()):
        return Response({'error':'Username already exists'},status=status.HTTP_400_BAD_REQUEST)
    if(User.objects.filter(email=data['email']).exists()):
        return Response({'error':'email already exists'},status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user=User.objects.create_user(
        username=data['username'],
        email=data['email'],
        last_name=data['last_name'],
        first_name=data['first_name'],
        password=data['password']
        )
        if user :
            UserProfile.objects.create(
            user=user,
            phone=data['phone'],
            address=data['address'],
            city=data['city'],
            pincode=data['pincode']
            )
        return Response({"message":"registration successfull"},status=status.HTTP_201_CREATED)
    except Exception as e:
        print("The Registration ERROR ",e)
        return Response({"error":str(e)},status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def refresh_access_token(request):
    refresh_token =request.data.get('refresh')
    if not refresh_token :
        return Response({'message':"Refresh Token is required"},status=status.HTTP_400_BAD_REQUEST)
    try:
        refresh=RefreshToken(refresh_token)
        new_access_token=refresh.access_token
        return Response({'access':str(new_access_token)},status=status.HTTP_201_CREATED)
    except TokenError:
        return Response({'message':"invlaid or expired refresh token"},status=status.HTTP_401_UNAUTHORIZED)


 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def handleprofile(request):
    user=request.user
    try:
        profile=user.userprofile
    except UserProfile.DoesNotExist:
        profile=None
    return Response(
        {
            "username":user.username,
            "email":user.email,
            "first_name":user.first_name,
            "last_name":user.last_name,
            "phone":profile.phone if profile else "",
            "address":profile.address if profile else "",
            "pincode":profile.pincode if profile else ""   ,
            "city":profile.city if profile else ""
        }

    )

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def handlelogout(request):
    refresh_token=request.data.get('refresh')
    if not refresh_token:
        return Response({"message": "Refresh token required"}, status=400)
    try:
        token=RefreshToken(refresh_token)
        token.blacklist()
        return Response({'message':"successfully logged out"},status=status.HTTP_200_OK)
    except Exception:
        return Response({'message':'Invalid Token'},status=status.HTTP_401_UNAUTHORIZED)


@api_view(["GET"])
def check_auth(request):
    if request.user.is_authenticated:
        return JsonResponse({
            "isLoggedIn": True,
            "username": request.user.username
        })
    return JsonResponse({"isLoggedIn": False}, status=401)
