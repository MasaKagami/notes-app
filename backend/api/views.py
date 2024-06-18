from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.

# simple view to create new user
class CreateUserView(generics.CreateAPIView): # a generic view built into django that handles creating a new user/object
    queryset = User.objects.all() # the list of all the different objects
    serializer_class = User # tells view what kind of data we'll have to look at
    permission_classes = [AllowAny] # who can call this