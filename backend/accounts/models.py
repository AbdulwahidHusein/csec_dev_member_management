from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models


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
        return self.create_user(email, password, **extra_fields)


class Member(AbstractBaseUser, PermissionsMixin):
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=25)
    profile_picture = models.ImageField(upload_to="profiles", null=True, blank=True)
    departement = models.CharField(max_length=50)
    study_year = models.IntegerField()
    github_link = models.CharField(max_length=100, null=True, blank=True)
    portfolio_link = models.CharField(max_length=100, null=True, blank=True)
    linkedin_link = models.CharField(max_length=100, null=True, blank=True)
    bio = models.TextField(max_length=1000, null=True, blank=True)
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email
    
