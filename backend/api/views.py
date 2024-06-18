from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

# Create your views here.

# simple view to create new user
class CreateUserView(generics.CreateAPIView): # a generic view built into django that handles creating a new user/object
    queryset = User.objects.all() # the list of all the different objects
    serializer_class = UserSerializer # tells view what kind of data we'll have to look at
    permission_classes = [AllowAny] # who can call this


class NoteListView(generics.ListCreateAPIView): # can both list and create
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated] # cannot call unless authenticalled

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author = user) # to return all the notes by the specific user. can only view notes by the author
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user) # saves the serializer (make new version of note)
        else:
            print(serializer.errors)
    
class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)