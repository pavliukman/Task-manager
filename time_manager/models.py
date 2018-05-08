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

    def __str__(self):
        return self.name


class Member(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, related_name='roles',
                             on_delete=models.DO_NOTHING)
    assigned_projects = models.ManyToManyField(Project)


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
    project = models.ForeignKey(
        Project, related_name='tasks', on_delete=models.CASCADE)
    estimated_time = models.DecimalField(
        max_digits=5, decimal_places=2, default=0)

    # task estimations
