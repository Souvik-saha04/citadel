import razorpay
import json
import os
from pathlib import Path
from dotenv import load_dotenv
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from .models import Order, OrderItem
from decimal import Decimal
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes, api_view
import logging

logger = logging.getLogger(__name__)

# Explicitly load .env from backend directory
backend_dir = Path(__file__).resolve().parent.parent
env_path = backend_dir / '.env'
load_dotenv(dotenv_path=str(env_path))

RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")

# Validate credentials exist
if not RAZORPAY_KEY_ID or not RAZORPAY_KEY_SECRET:
    logger.error("❌ Razorpay credentials not found! Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env")
    client = None
else:
    try:
        client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))
        logger.info("✅ Razorpay client initialized successfully")
    except Exception as e:
        logger.error(f"❌ Failed to initialize Razorpay client: {str(e)}")
        client = None


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def create_order(request):
    # ✅ Validate Razorpay credentials
    if client is None:
        logger.error("❌ Razorpay client not initialized. Missing credentials.")
        return JsonResponse({
            "error": "Payment gateway not configured. Razorpay credentials missing."
        }, status=500)
    
    try:
        data = request.data  # Use DRF's request.data instead of json.loads
    except Exception as e:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    user = request.user
    cart_items = data.get("items", [])

    if not cart_items:
        return JsonResponse({"error": "Cart is empty"}, status=400)

    total_amount = Decimal(0)

    # 🛒 Calculate total
    for item in cart_items:
        # Use the negotiated price per unit from cart data
        price_per_unit = Decimal(str(item.get("price per unit", item.get("price", 0))))
        quantity = int(item.get("quantity", 0))
        total_amount += price_per_unit * quantity

    # Convert to paise (smallest currency unit) as integer
    amount_paise = int(total_amount * 100)

    if amount_paise <= 0:
        return JsonResponse({"error": "Invalid order amount"}, status=400)

    try:
        # 💳 Create Razorpay order
        razorpay_order = client.order.create({
            "amount": amount_paise,
            "currency": "INR",
            "payment_capture": 1
        })

        # 📦 Save Order
        order = Order.objects.create(
            user=user,
            total_amount=total_amount,
            razorpay_order_id=razorpay_order["id"],
            is_paid=False
        )

        # 📦 Save Order Items
        for item in cart_items:
            price_per_unit = Decimal(str(item.get("price per unit", item.get("price", 0))))
            OrderItem.objects.create(
                order=order,
                product_name=item["name"],
                price=price_per_unit,  # Store negotiated price per unit
                quantity=item["quantity"]
            )

        logger.info(f"✅ Order created: {razorpay_order['id']} for user {user.username} for amount ₹{total_amount}")
        return JsonResponse({
            "order_id": razorpay_order["id"],
            "amount": amount_paise,
            "key": RAZORPAY_KEY_ID
        })
    
    except Exception as e:
        logger.error(f"❌ Razorpay order creation failed: {str(e)}")
        return JsonResponse({
            "error": f"Failed to create order: {str(e)}"
        }, status=500)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def verify_payment(request):
    if client is None:
        logger.error("❌ Razorpay client not initialized")
        return JsonResponse({
            "status": "failed",
            "error": "Payment gateway not configured"
        }, status=500)
    
    try:
        data = request.data  # Use DRF's request.data
    except Exception as e:
        return JsonResponse({"status": "failed", "error": "Invalid JSON"}, status=400)

    try:
        # ✅ Verify Razorpay signature
        client.utility.verify_payment_signature({
            "razorpay_order_id": data["razorpay_order_id"],
            "razorpay_payment_id": data["razorpay_payment_id"],
            "razorpay_signature": data["razorpay_signature"]
        })

        # ✅ Mark order as paid
        order = Order.objects.get(
            razorpay_order_id=data["razorpay_order_id"]
        )
        order.is_paid = True
        order.save()

        logger.info(f"✅ Payment verified for order: {data['razorpay_order_id']}")
        return JsonResponse({"status": "success"})

    except Order.DoesNotExist:
        logger.error(f"❌ Order not found: {data.get('razorpay_order_id')}")
        return JsonResponse({
            "status": "failed",
            "error": "Order not found"
        }, status=404)
    
    except Exception as e:
        logger.error(f"❌ Payment verification failed: {str(e)}")
        return JsonResponse({
            "status": "failed",
            "error": str(e)
        }, status=400)