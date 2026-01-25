from django.urls import path 
from .views import *

urlpatterns=[
    path('register/',handleRegistration),
    path('login/',handleLogin),
    path('profile/',handleprofile),
    path('csrf/',get_csrf),
    path('logout/',Handlelogout),
    path('check_auth/',check_auth),
]