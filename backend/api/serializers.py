from django.contrib.auth.models import User
from rest_framework import serializers

# take python object and convert to JSON data & vice-versa;

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        # addings settings for model fields without explicitly defining them in the serializer
        extra_kwargs = {"password" : {"write_only": True}} # write_only makes it such that it is not included in the serialized output.

    def create(self, validated_data):
                user = User.objects.create_user(**validated_data)
                return user