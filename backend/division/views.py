from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import DivisionSerializer, MemberShipRequestSerializer
from rest_framework import viewsets
from .models import Division, MemberShipRequest
from accounts.serializers import MemberSerializer
from rest_framework.response import Response
from accounts.models import Member
class DivisionViewset(viewsets.ModelViewSet):
    queryset = Division.objects.all()
    serializer_class = DivisionSerializer
    authentication_classes = [JWTAuthentication]
    def get_permissions(self):
        if self.request.method == "GET":
            return []
        return []
    
    @action(detail=False, methods=["get"])
    def get_all_members(self, request):
        id = request.GET.id
        division = Division.objects.get(id=id)
        members = division.members
        
        serializer = MemberSerializer(instance=members, many=True)
        return Response(serializer.data)
    @action(detail=False, methods=["post"])
    def approve_member(self, request):
        id = request.data["id"]
        divid = request.data["divid"]
        member = Member.objects.get(id=id)
        division = Division.objects.get(id=divid)
        
        member.divisions.add(division)
        member.save()
        return Response("User Added")
        
        pass
    
class MemberShipREqViewset(viewsets.ModelViewSet):
    queryset = Division.objects.all()
    serializer_class = MemberShipRequestSerializer
    authentication_classes = [JWTAuthentication]
    
    