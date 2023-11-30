from .models import Post, Comment
from rest_framework import serializers
from accounts.serializers import CustomUserMemberSerializer
from accounts.serializers import MemberSerializer

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"
        
class PostSerializer(serializers.ModelSerializer):
    creator = CustomUserMemberSerializer(read_only=True)
    comments = CommentSerializer(required=False, many=True)
    class Meta:
        model  = Post
        fields = "__all__"