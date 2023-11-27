from django.db import models
from accounts.models import CustomUser


class Post(models.Model):
    title = models.CharField(max_length=50, default="untitled")
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True)
    image = models.ImageField(upload_to="images/community/posts")
    likes =models.IntegerField()
    
    def __str__(self) -> str:
        return self.title
    
class Comment(models.Model):
    commentor = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="comments")
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)