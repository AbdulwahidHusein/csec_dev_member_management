from .models import Post, Comment
from rest_framework import serializers
from accounts.serializers import CustomUserMemberSerializer

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"
        
class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(required=False, many=True)
    creator = CustomUserMemberSerializer()
    class Meta:
        model  = Post
        fields = "__all__"