from django.contrib import staticfiles
from django.conf import settings

from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/docs/', include('member_management.swagger')),
    path("members/", include("accounts.urls"), name="members"),
    path("events/", include("events.urls"), name="events"),
    path("divisions/", include("division.urls"), name="event.urls"),
    path("community/", include("community.urls"), name="community"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
