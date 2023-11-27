from rest_framework.response import Response
from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from  rest_framework import viewsets
from .serializers import EventSerializer
from .models import (
    Event, Anouncement
)
from django.core.mail import send_mail
from accounts.models import Member
from django.core.mail import send_mail

class EventViewset(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    authentication_classes = [JWTAuthentication]
    serializer_class = EventSerializer

    def get_permissions(self):
        if self.request.method == "POST":
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]

    def perform_create(self, serializer):
        event = serializer.save()
        
        if self.request.method == "POST" and event.notify:
            members = Member.objects.filter(approved=True)
            email_list = [member.user.email for member in members]
            subject = event.title
            message = f"{event.description}"
            from_email = "abdulwahidhussen750@gmail.com"

            send_mail(subject, message, from_email, email_list)

class AnouncementViewset(viewsets.ModelViewSet):
    queryset = Anouncement.objects.all()
    serializer_class = []
    authentication_classes = [JWTAuthentication]
    def get_permissions(self):
        if self.request.method == "GET":
            return []
        return [permissions.AllowAny()]