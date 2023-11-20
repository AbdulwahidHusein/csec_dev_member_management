from rest_framework import viewsets
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import  permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from django.core.exceptions import ObjectDoesNotExist
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import action
from .serializers import MemberSerializer, MemberLoginSerializer, MemberRegistrationSerializer
from django.db import transaction

class MemberViewSet(viewsets.ModelViewSet):
    serializer_class = []
    @action(detail=False, methods=['post'])
    def login(self, request):
        serializer = MemberLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'first_name':user.first_name,
            'last_name':user.last_name,
            'email':user.username,
        })
    @transaction.atomic
    @action(detail=False, methods=['post'])
    def register(self, request):
        serializer = MemberRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
    @transaction.atomic
    def perform_create(self, serializer):
        user = serializer.save()