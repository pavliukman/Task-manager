from django.contrib import admin

from time_manager.models import Task, Project, Role, Member

# register Tasks in admin panel
admin.site.register(Task)
# register Projects in admin panel
admin.site.register(Project)
# register Roles in admin panel
admin.site.register(Role)
# register Projects in admin panel
admin.site.register(Member)
