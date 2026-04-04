from django.urls import path 
from .views import *
urlpatterns=[
    path('create-order/',create_order),
    path('verify/',verify_payment),
]