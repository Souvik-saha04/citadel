from django.shortcuts import render
from .models import Cart,CartItems
from products.models import Product
from AI_Negotiaton.models import NegotiationHistory
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from decimal import Decimal

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addtocart(request):
    new_quantity = int(request.data.get("quantity"))
    product_id = request.data.get("product_id")
    negotiated_price = request.data.get("negotiated_price")  # Don't convert yet

    cart, _ = Cart.objects.get_or_create(user=request.user)
    
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
    
    item, created = CartItems.objects.get_or_create(
        cart=cart, 
        product=product,
        defaults={'quantity': new_quantity}
    )

    if negotiated_price is not None:
        item.negotiated_price = Decimal(str(negotiated_price))
    else:
        item.negotiated_price = product.price_per_unit
    
    if not created:
        item.quantity += new_quantity
    
    item.save()
    return Response({"message": "Cart updated successfully"}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def viewcart(request):
    cart, _ = Cart.objects.get_or_create(user=request.user)
    if not cart.items.exists():
        return Response(
            {"message": "No items in the cart"},
            status=status.HTTP_200_OK
        )
    data = []
    for item in cart.items.all():
        price = item.negotiated_price if item.negotiated_price else item.product.price_per_unit
        
        data.append(
            {
                "product_id": item.product.id,  
                "name": item.product.name,
                "image": item.product.image.url,  
                "category": item.product.category,  
                "quantity": item.quantity,
                "price per unit": float(price),  
                "original_price": float(item.product.original_price),  
                "total price": float(price * item.quantity),  
                "is_negotiated": item.negotiated_price is not None and item.negotiated_price != item.product.price_per_unit
            }
        )
    return Response(data, status=status.HTTP_200_OK)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def remove_item(request):
    product_id = request.data.get("product_id")
    try:
        cart = Cart.objects.get(user=request.user)
        CartItems.objects.filter(cart=cart, product_id=product_id).delete()
        return Response({"message": "Removed"}, status=status.HTTP_200_OK)
    except Cart.DoesNotExist:
        return Response({"error": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updatequantity(request):
    product_id = request.data.get("product_id")
    change = int(request.data.get("updated_quantity"))

    cart, _ = Cart.objects.get_or_create(user=request.user)

    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response(
            {"error": "Product not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    try:
        item = CartItems.objects.get(cart=cart, product=product)
    except CartItems.DoesNotExist:
        return Response(
            {"error": "Item not in cart"},
            status=status.HTTP_404_NOT_FOUND
        )

    item.quantity += change

    if item.quantity <= 0:
        item.delete()
        return Response(
            {"message": "Item removed from cart", "quantity": 0},
            status=status.HTTP_200_OK
        )

    item.save()
    return Response(
        {"message": "Quantity updated", "quantity": item.quantity},
        status=status.HTTP_200_OK
    )