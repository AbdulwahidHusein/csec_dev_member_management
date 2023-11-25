from django.contrib import admin
from .models import Member, Membership, Team, CustomUser

admin.site.register(Member)
admin.site.register(Membership)
admin.site.register(Team)
admin.site.register(CustomUser)