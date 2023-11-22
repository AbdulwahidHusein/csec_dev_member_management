from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MemberViewSet, AuthViewset

router = DefaultRouter()
router.register('', MemberViewSet, basename='user')
router.register("auth", AuthViewset, basename="auth")

urlpatterns = [
    path('', include(router.urls), name='members-list'),
]