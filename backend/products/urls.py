from django.urls import path
from .views import *

urlpatterns=[
    path('insert/',Insert_Product),
    path('get_products/',Show_Product),
    path('<int:id>/',fetch_single_product),
    path('',fetch_searched_product,name="search_product"),
]