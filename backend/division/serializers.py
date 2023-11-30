from rest_framework import serializers
from .models import Division, MemberShipRequest

class DivisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Division
        fields = [
            'name', 'description', 'logo', "id",
        ]
        
class MemberShipRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = MemberShipRequest
        fields = [
            "user", "division", "is_approved", "created_at"
        ]