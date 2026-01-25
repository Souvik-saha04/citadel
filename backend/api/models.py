from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class UserProfile(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE,related_name="userprofile")
    phone=models.CharField(max_length=10)
    address=models.TextField()
    city=models.CharField(max_length=50)
    pincode=models.CharField(max_length=6)
    def __str__(self):
        return self.user.username


