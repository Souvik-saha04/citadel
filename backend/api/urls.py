from django.urls import path
from .views import *
urlpatterns=[
    path('register/',handleRegistration),
    path('login/',handleLogin),
    path('profile/',handleprofile),
]