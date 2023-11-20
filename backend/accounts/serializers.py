from .models import Member

from rest_framework import serializers

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fileds = "__all__"

class MemberRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = [
            "email", "password",
            "full_name", "phone_number","profile_picture",
            "departement", "study_year", "github_link",
            "portfolio_link", "linkedin_link", "bio"
        ]

class MemberLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = [
            "email", "password",
        ]
    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            user = Member.objects.filter(email=email).first()
            if user and user.check_password(password):
                data['user'] = user
                return data
        raise serializers.ValidationError('Invalid credentials')
