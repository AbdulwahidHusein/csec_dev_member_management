from rest_framework import permissions

class IsIdUsers(permissions.BasePermission):
    def has_object_permission(self, request, view, member):
        if member:
            return member.user.id == request.user.id
        return False

class IsUSerTeamMember(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return True