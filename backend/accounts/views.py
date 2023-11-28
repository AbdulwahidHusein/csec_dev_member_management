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
    TeamApproveSerializer, CustomUserSerializer
)
from django.db import transaction
from .models import Member, CustomUser, Team
from .custom_permissions import IsIdUsers, IsUSerTeamMember

class AuthViewset(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    queryset = CustomUser.objects.all()
    
    def get_serializer_class(self):
        if self.action == "login":
            return MemberLoginSerializer
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
            member_data["is_admin"] = user.is_superuser
            
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
    def get_serializer_class(self):
        if self.action == "register":
            return MemberRegistrationSerializer
        elif self.action == "login":
            return CustomUserSerializer
        else:
            return MemberSerializer

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
        if self.action == "aprrove_member":
            return [permissions.IsAdminUser()]
        if self.request.method in ['PUT', 'PATCH']:
            return [permissions.IsAuthenticated()]
        return [permissions.IsAdminUser()]
    
    @transaction.atomic
    @action(detail=False, methods=['post'])
    def register(self, request):
        print(request.data)
        serializer = MemberRegistrationSerializer(data=request.data)
        serializer.is_valid()
        
        user_data = serializer.validated_data['user']
        user = CustomUser.objects.create_user(**user_data)
        serializer.validated_data["user"] = user
        member = Member(**serializer.validated_data)
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
            member_data["is_admin"] = user.is_superuser
        except:
            pass
        
        return Response(
            {"member_data" : member_data}
        )
    @transaction.atomic
    @action(detail=False, methods=['post', "put", "patch"])
    def aprrove_member(self, request):
        data = request.data
        member_ids = data["memberIds"]
        approved_members = []
        for id in member_ids:
            member = Member.objects.get(id=id)
            member.approved = False
            member.save()
        return Response("success members disapproved")
    
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
        