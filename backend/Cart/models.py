from django.db import models
from products.models import Product
from django.conf import settings
# Create your models here.

class Cart(models.Model):
    user=models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now_add=True)

class CartItems(models.Model):
    cart=models.ForeignKey(Cart,related_name="items",on_delete=models.CASCADE)
    quantity=models.PositiveIntegerField(default=1)
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    negotiated_price=models.DecimalField(
        decimal_places=2,
        null=True,
        blank=True,
        max_digits=10
    )
    def __str__(self):
        return f"{self.product.name}-{self.cart.user}"
    class Meta:
        unique_together=("cart","product")