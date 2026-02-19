from django.db import models
from django.conf import settings
from products.models import Product

# Create your models here.

class NegotiationHistory(models.Model):
    DECISION_CHOICES = [
        ("ACCEPT", "Accepted"),
        ("COUNTER", "Counter Offered"),
        ("REJECT", "Rejected"),
    ]

    STATUS_CHOICES = [
        ("ACTIVE", "Active"),
        ("COMPLETED", "Completed"),
        ("CANCELLED", "Cancelled"),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    round_no = models.PositiveIntegerField()
    user_price = models.PositiveIntegerField()
    system_price = models.PositiveIntegerField()

    decision = models.CharField(max_length=10, choices=DECISION_CHOICES)
    ai_message = models.TextField()

    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default="ACTIVE"
    )

    created_at = models.DateTimeField(auto_now_add=True)
