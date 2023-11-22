from django.db import models
from accounts.models import CustomUser


class Post(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True)
    image = models.ImageField(upload_to="images/community/posts")
    likes =models.IntegerField()
    