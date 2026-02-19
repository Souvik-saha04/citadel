from django.shortcuts import render
from .serializers import *
from django.db.models import Q
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


@api_view(['GET'])
def fetch_single_product(request,id):
    try:
        data=Product.objects.get(id=id)
        serializer=ProductSerializer(instance=data)
        return Response(serializer.data,status=status.HTTP_200_OK)

    except Product.DoesNotExist:
        return Response({"message":"product not found"},status=status.HTTP_404_NOT_FOUND)
    

@api_view(['GET'])
@permission_classes([AllowAny])
def fetch_searched_product(request):
    query = request.GET.get('search', '')  
    
    if not query:
        return Response({"message": "No search query provided"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        products = Product.objects.filter(
            Q(name__icontains=query) | 
            Q(category__icontains=query)
        )
        
        if products.exists():
            serializer = ProductSerializer(products, many=True)  
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response([], status=status.HTTP_200_OK)  
            
    except Exception as e:
        return Response(
            {"message": "Error searching products", "error": str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )