from django.shortcuts import render
from .serializers import *
from .models import *
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework  import status
from rest_framework.permissions import AllowAny



@api_view(['POST'])
def Insert_Product(request):
    data=request.data
    serialized_data=ProductSerializer(data=data,many=True)
    if serialized_data.is_valid():
        serialized_data.save()
        return Response({"message":"products created"},status=status.HTTP_201_CREATED)
    return Response(serialized_data.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def Show_Product(request):
    data=Product.objects.all()
    serializer=ProductSerializer(instance=data,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)