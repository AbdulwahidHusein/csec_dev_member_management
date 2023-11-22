from .models import Member
from .models import CustomUser, Team, Membership
from rest_framework import serializers


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "email", "password"
        ]
        
class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = [
            "full_name", "phone_number","profile_picture",
            "departement", "study_year", "github_link",
            "portfolio_link", "linkedin_link", "bio"
        ]
        
class MemberRegistrationSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()
    class Meta:
        model = Member
        fields = [
            "user",
            "full_name", "phone_number","profile_picture",
            "departement", "study_year", "github_link",
            "portfolio_link", "linkedin_link", "bio"
        ]

class MemberLoginSerializer(serializers.ModelSerializer):
    password = serializers.CharField()
    email  = serializers.EmailField()
    class Meta:
        model = CustomUser
        fields = [
            "email", "password",
        ]

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            user = CustomUser.objects.filter(email=email).first()

            if user and user.check_password(password):
                data['user'] = user
                return data

        raise serializers.ValidationError('Invalid credentials')

class TeameCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = [
            "name", "members", "bio", "team_lead", ""
        ]
class TeamApproveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = [
            "approved"
        ]
