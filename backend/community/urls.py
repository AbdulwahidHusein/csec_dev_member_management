from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewset

router = DefaultRouter()
router.register('posts', PostViewset, basename='pot')

urlpatterns = [
    path('', include(router.urls), name='post'),
]