
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/docs/', include('member_management.swagger')),
    path("members/", include("accounts.urls"), name="members"),
    path("events/", include("events.urls"), name="events"),
    path("divisions/", include("division.urls"), name="event.urls"),
]
