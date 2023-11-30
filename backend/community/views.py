from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import viewsets
from .serializers import PostSerializer, CommentSerializer
from rest_framework.response import Response
from .models import Post, Comment


class PostViewset(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    authentication_classes = [JWTAuthentication]
    def get_queryset(self):
        if self.request.method == "GET":
            return Post.objects.all().order_by("-created_at")
        user = self.request.user
        return Post.objects.filter(creator_id=user.id)
    
class CommetnViewset(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    def get_queryset(self):
        if self.request.method in  ["put", "patch"]:
            user = self.request.user
            return Comment.objects.filter(commentor_id=user.id)
        else:
            return Comment.objects.all()
