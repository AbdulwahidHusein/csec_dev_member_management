from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AnouncementViewset, EventViewset

router = DefaultRouter()
router.register('', AnouncementViewset, basename='user')
router.register("announcements", EventViewset, basename="auth")

urlpatterns = [
    path('', include(router.urls), name='announcements'),
]