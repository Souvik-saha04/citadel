from django.urls import path 
from .views import *

urlpatterns=[
    path('register/',handleRegistration),
    path('login/',handleLogin),
    path('profile/',handleprofile),
    path('logout/',handlelogout),
    path('refresh/',refresh_access_token),
    path('check_auth/',check_auth),
]