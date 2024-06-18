from django.contrib.auth.models import User
from rest_framework import serializers

# take python object and convert to JSON data & vice-versa;

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Userfields = ["id", "username", "password"]