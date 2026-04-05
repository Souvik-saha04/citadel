from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from products.models import Product
from .models import NegotiationHistory
from .negotiation import negotiate_price, MAX_NEGOTIATION_ROUNDS


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def negotiate_view(request):
    try:
        from .ai_messages import generate_message
    except ImportError:
        return Response(
            {"error": "AI negotiation service is unavailable. Please contact support."},
            status=503
        )

    user = request.user

    # ---------- INPUT VALIDATION ----------
    try:
        product_id = int(request.data.get("product_id"))
        user_price = int(request.data.get("user_price"))
    except (TypeError, ValueError):
        return Response({"error": "Invalid input"}, status=400)

    product = get_object_or_404(Product, id=product_id)

    # ---------- CHECK ACTIVE NEGOTIATION & CALCULATE ROUND ----------
    last_negotiation = NegotiationHistory.objects.filter(
        user=user,
        product=product,
        status="ACTIVE"
    ).order_by('-round_no').first()

    # If there's a completed negotiation with ACCEPT, don't allow new ones
    completed_accept = NegotiationHistory.objects.filter(
        user=user,
        product=product,
        status="COMPLETED",
        decision="ACCEPT"
    ).exists()
    
    if completed_accept:
        return Response(
            {"error": "Negotiation already completed for this product"},
            status=403
        )

    # Calculate the current round number
    if last_negotiation:
        round_no = last_negotiation.round_no + 1
    else:
        round_no = 1

    # Check if max rounds exceeded BEFORE processing
    if round_no > MAX_NEGOTIATION_ROUNDS:
        return Response(
            {"error": "Maximum negotiation rounds reached. No more offers allowed."},
            status=403
        )

    # ---------- PRICE DECISION (NO AI) ----------
    decision_data = negotiate_price(
        user=user,
        user_price=user_price,
        product=product,
        round_no=round_no
    )

    decision = decision_data["decision"]
    price = decision_data["price"]

    # ---------- AI MESSAGE (Pass user_price) ----------
    ai_text = generate_message(decision, price, user_price=user_price)

    # ---------- DETERMINE STATUS ----------
    if decision == "ACCEPT":
        status = "COMPLETED"
    elif round_no >= MAX_NEGOTIATION_ROUNDS:
        status = "COMPLETED"
    else:
        status = "ACTIVE"

    # ---------- SAVE NEGOTIATION HISTORY ----------
    NegotiationHistory.objects.create(
        user=user,
        product=product,
        round_no=round_no,
        user_price=user_price,
        system_price=price,
        decision=decision,
        ai_message=ai_text,
        status=status
    )

    return Response({
        "decision": decision,
        "price": price,
        "message": ai_text,
        "round_no": round_no
    })