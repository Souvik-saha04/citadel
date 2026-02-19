from django.contrib import admin
from django.urls import path
from .views import *
urlpatterns = [
    path('add/',addtocart ),
    path('',viewcart),
    path("delete/",remove_item),
    path("update/",updatequantity),
]