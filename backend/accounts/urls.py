from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MemberViewSet

router = DefaultRouter()
router.register('', MemberViewSet, basename='user')


urlpatterns = [
    path('', include(router.urls), name='members-list'),
]