from django.db import models


class Project(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField(default='', blank=True)

    def __str__(self):
        return self.name


class Task(models.Model):

    def __str__(self):
        return self.name

    name = models.CharField(max_length=30)
    project = models.ForeignKey(Project, related_name='tasks', on_delete=models.CASCADE)

    # task estimations

