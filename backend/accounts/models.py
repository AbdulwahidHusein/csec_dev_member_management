from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from division.models import Division

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        self.model.REQUIRED_FIELDS = []
        return self.create_user(email, password, **extra_fields)
class CustomUser(AbstractBaseUser, PermissionsMixin):
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    email = models.EmailField(unique=True)
    objects = CustomUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
class Member(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='member')
    full_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=25)
    profile_picture = models.ImageField(upload_to="images/profiles", null=True, blank=True)
    departement = models.CharField(max_length=50)
    study_year = models.IntegerField(null=True, blank=True)
    github_link = models.CharField(max_length=100, null=True, blank=True)
    portfolio_link = models.CharField(max_length=100, null=True, blank=True)
    linkedin_link = models.CharField(max_length=100, null=True, blank=True)
    bio = models.TextField(max_length=1000, null=True, blank=True)
    approved = models.BooleanField(default=False)
    divisions = models.ManyToManyField(Division, related_name="members", null=True, blank=True)
    leetcode_link = models.CharField(max_length=100, null=True, blank=True)
    code_forces_link = models.CharField(max_length=100, null=True, blank=True)
    hacker_rank_link = models.CharField(max_length=100, null=True, blank=True)
    def __str__(self):
        return self.user.email

class Team(models.Model):
    """
    usage:
    team = Team.objects.get(id=1)  
    memberships = team.membership_set.all()
    memberships is iterable
    """
    name = models.CharField(unique=True, max_length=100)
    members = models.ManyToManyField('Member', through='Membership')
    team_lead = models.ForeignKey('Member', on_delete=models.SET_NULL, \
        null=True, blank=True, related_name='lead_teams')
    bio = models.CharField(max_length=200, null=True, blank=True)
    joined_at = models.DateField(auto_now_add=True, null=True, blank=True)
    approved=  models.BooleanField(default=False)
    def __str__(self):
        return self.name

class Membership(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    user = models.ForeignKey(Member, on_delete=models.CASCADE)
    joined_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.email} - {self.team.name}'

