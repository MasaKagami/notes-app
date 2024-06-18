from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True) # automatically added.
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes") # models.CASCADE deletes all the notes when the user is deleted.
    # what field name we want to put on the user. gives us .notes

    def __str__(self):
        return self.title
    
