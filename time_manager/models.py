from django.db import models


class Member(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Project(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField(default='', blank=True)
    members = models.ManyToManyField(Member, blank=True)

    def __str__(self):
        return self.name


class Task(models.Model):

    def __str__(self):
        return self.name

    name = models.CharField(max_length=30)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, default='')

    # task estimations

