from rest_framework import serializers
from .models import (
    Event, Anouncement
)

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"

class AnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anouncement
        fields = '__all__'