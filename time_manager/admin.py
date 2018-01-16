from django.contrib import admin

from time_manager.models import Task, Project

# register Tasks in admin panel
admin.site.register(Task)
# register Projects in admin panel
admin.site.register(Project)
