from django.urls import path
from .views import *

urlpatterns=[
    path('insert/',Insert_Product),
    path('get_products/',Show_Product),
]