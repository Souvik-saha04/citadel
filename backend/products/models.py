from django.db import models
# Create your models here.

class Product(models.Model):
    name=models.CharField(max_length=100)
    category_choices=[
        ("Meat","Meat"),
        ("Vegetables","Vegetables"),
        ("Leafy","Leafy"),
        ("Millets","Millets"),
        ("Cereals","Cereals"),
        ("Eggs","Eggs")
    ]
    category=models.CharField(max_length=50,choices=category_choices)
    unit_choices=[
        ('gram','gram'),
        ('kilogram','kilogram'),
        ('piece','piece'),
        ('dozen','dozen'),
        ('pieces','pieces'),
        ('box','box'),
        ('ml','ml'),
        ('litre','litre'),
        ('bunch','bunch'),
    ]
    unit=models.CharField(max_length=10,choices=unit_choices,null=False,blank=False)
    quantity=models.IntegerField(null=False,blank=False)
    varient_choices=[
        ('organic','organic'),
        ('regular','regular'),
        ('fresh','fresh'),
        ('natural','natural'),
        ('hybrid','hybrid')
    ]
    variant=models.CharField(max_length=15,choices=varient_choices,null=False,blank=False)
    price_per_unit=models.DecimalField(decimal_places=2,max_digits=7,null=False,blank=False)
    original_price=models.DecimalField(decimal_places=2,max_digits=7,null=False,blank=False)
    stock_quantity=models.IntegerField(null=False,blank=False)
    harvest_date=models.DateField(null=False,blank=False)
    expiry=models.DateField(null=True,blank=True)
    description=models.TextField(null=True,blank=True)
    image=models.URLField(null=False,blank=False)
    def __str__(self):
        return self.name