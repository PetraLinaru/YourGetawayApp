from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('register/', views.user_register, name='user_register'),
    path('login/', views.user_login, name='login'),
]
