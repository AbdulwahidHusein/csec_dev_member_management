from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AnouncementViewset, EventViewset

router = DefaultRouter()
router.register('announcement', AnouncementViewset, basename='')
router.register("", EventViewset, basename="")

urlpatterns = [
    path('', include(router.urls), name='announcements'),
]