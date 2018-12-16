from django.db import models
from django.contrib.auth.models import User


class Role(models.Model):
    name = models.CharField(max_length=40)
    description = models.TextField(default='', blank=True)

    def __str__(self):
        return self.name


class Project(models.Model):
    name = models.CharField(max_length=60)
    description = models.TextField(default='', blank=True)
    assigned_to = models.ManyToManyField(User)
    assigned_to_users_object = []
    can_edit = models.ManyToManyField(User, 'can_edit')

    def get_assigned_to_users(self):
        return User.objects.filter(project=self)

    def get_can_edit_users(self):
        return User.objects.filter(can_edit=self)

    def __str__(self):
        return self.name


class Task(models.Model):

    IN_PROGRESS = 'In Progress'
    NEW = 'New'
    IN_TESTING = 'In Testing'
    SOLVED = 'Solved'
    STATUSES = (
        (IN_PROGRESS, 'In Progress'),
        (NEW, 'New'),
        (IN_TESTING, 'In Testing'),
        (SOLVED, 'Solved'),
    )

    def __str__(self):
        return self.name

    name = models.CharField(max_length=60)
    description = models.TextField(default='', blank=True)
    status = models.CharField(
        max_length=12,
        choices=STATUSES,
        default=NEW,
    )
    assigned_to = models.ForeignKey(
        User, related_name='assignee', on_delete=models.CASCADE)
    project = models.ForeignKey(
        Project, related_name='tasks', on_delete=models.CASCADE)
    estimatedTime = models.DecimalField(
        max_digits=5, decimal_places=2, default=0)

    def get_assigned_user(self):
        return User.objects.get(assignee=self)

    # task estimations
