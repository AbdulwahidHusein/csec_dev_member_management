from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import viewsets
from accounts.serializers import PostSerializer
from rest_framework.response import Response
from .models import Post

class PostViewset(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    authentication_classes = [JWTAuthentication]
    
    def get_queryset(self):
        if self.request.method == "GET":
            return Post.objects.all()
        user = self.request.user
        return Post.objects.filter(creator_id=user.id)
