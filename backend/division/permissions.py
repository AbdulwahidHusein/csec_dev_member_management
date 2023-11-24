from rest_framework import permissions

class IsUserPreisdent(permissions.BasePermission):
    def has_object_permission(self, request, view, division):
        if division:
            return division.preisdent.id == request.user.id
        return False

class IsUSerDivisionMember(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return True