from .models import Member
from .models import CustomUser, Team, Membership
from rest_framework import serializers
from division.serializers import DivisionSerializer

class CustomUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    class Meta:
        model = CustomUser
        fields = [
            "email", "password",
        ]

       
class MemberSerializer(serializers.ModelSerializer):
    divisions = DivisionSerializer(many=True, read_only=True, required=False)
    approved = serializers.BooleanField(read_only=True)
    profile_picture = serializers.ImageField()
    class Meta:
        model = Member
        fields = [
            "id",
            "full_name", "phone_number","profile_picture","divisions",
            "departement", "study_year", "github_link",
            "portfolio_link", "linkedin_link", "bio", "approved"
        ]

class MemberRegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(read_only=True)
    password = serializers.CharField(read_only=True)
    #profile_picture = serializers.ImageField()
    class Meta:
        model = Member
        fields = [
            "email", "password",
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
            "approved", "id"
        ]

class CustomUserMemberSerializer(serializers.ModelSerializer):
    member = MemberSerializer()
    class Meta:
        model = CustomUser
        fields = [
            "member", "email"
        ]