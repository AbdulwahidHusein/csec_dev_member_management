from rest_framework.response import Response
from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from  rest_framework import viewsets
from .serializers import EventSerializer
from .models import (
    Event, Anouncement
)
class EventViewset(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    queryset = Event.objects.all()
    authentication_classes = [JWTAuthentication]
    def get_permissions(self):
        if self.request.method == "GET":
            return []
        return [permissions.IsAdminUser()]

class AnouncementViewset(viewsets.ModelViewSet):
    queryset = Anouncement.objects.all()
    serializer_class = []
    authentication_classes = [JWTAuthentication]
    def get_permissions(self):
        if self.request.method == "GET":
            return []
        return [permissions.IsAdminUser()]