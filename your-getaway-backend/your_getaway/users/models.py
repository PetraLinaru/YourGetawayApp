from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    USER_ROLE_CHOICES = (
        ('user', 'User'),
        ('admin', 'Admin'),
    )

    
    email=models.CharField(max_length=255,unique=True)
    password=models.CharField(max_length=255)
    username=models.CharField( max_length=50,unique=True)
    role = models.CharField(max_length=10, choices=USER_ROLE_CHOICES, default='user')
 

  
  

