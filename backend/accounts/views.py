from rest_framework import viewsets
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from django.core.exceptions import ObjectDoesNotExist
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import action

from .serializers import (
    MemberSerializer,
    MemberLoginSerializer,
    MemberRegistrationSerializer,
    TeameCreationSerializer,
    TeamApproveSerializer
)
from django.db import transaction
from .models import Member, CustomUser, Team
from .custom_permissions import IsIdUsers, IsUSerTeamMember

class AuthViewset(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    queryset = CustomUser.objects.all()
    def get_permissions(self):
        if self.action == "login":
            return []
        return [permissions.IsAuthenticated()]
    @action(detail=False, methods=['post'])
    def login(self, request):
        serializer = MemberLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data['user']
        member_data = ""
        try:
            member = Member.objects.get(user=user)
            serializer = MemberSerializer(instance=member)
            member_data = serializer.data
        except:
            pass
        refresh = RefreshToken.for_user(user)

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            "member_data":member_data
        })
    

class MemberViewSet(viewsets.ModelViewSet):
    #queryset = Member.objects.all()
    #permission_classes = [permissions.IsAdminUser]
    authentication_classes = [JWTAuthentication]
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

    def partial_update(self, request, pk=None):
        member = self.get_object()
        serializer = MemberSerializer(instance=member, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response(serializer.data)

    def get_object(self):
        return Member.objects.get(user=self.request.user)
        #return self.request.user.member
    
    def get_permissions(self):
        if self.action == 'login' or self.action == 'register':
            return []
        if self.action == "get_details":
            return [permissions.IsAuthenticated()]
        if self.request.method in ['PUT', 'PATCH']:
            return [permissions.IsAuthenticated()]
        return [permissions.IsAdminUser()]
    
    @transaction.atomic
    @action(detail=False, methods=['post'])
    def register(self, request):
        serializer = MemberRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user_data = serializer.validated_data.pop('user')
        user = CustomUser.objects.create_user(**user_data)
        
        member = Member(user=user, **serializer.validated_data)
        member.save()

        refresh = RefreshToken.for_user(user)

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            "member_data":serializer.data,
        })
    @transaction.atomic
    @action(detail=False, methods=['get'])
    def get_details(self, request):
        user = request.user
        member_data = False
        try:
            member = Member.objects.get(user=user)
            serializer = MemberSerializer(instance=member)
            member_data = serializer.data
            member_data["email"] = user.email
        except:
            pass
        
        return Response(
            {"member_data" : member_data}
        )

class TeamViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    queryset = Team.objects.all()
    def get_permissions(self):
        if self.action == "approve_team":
            return [permissions.IsAdminUser()]
        if self.request.method == "post":
            return [permissions.IsAuthenticated()]
        return [permissions.IsAuthenticated(), IsUSerTeamMember()]
    @action(detail=False, methods=["post"])
    def approve_team(self, request):
        serializer = TeamApproveSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()