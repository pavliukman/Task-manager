from django.db import models


class Project(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField(default='', blank=True)

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

    name = models.CharField(max_length=30)
    description = models.TextField(default='', blank=True)
    status = models.CharField(
        max_length=12,
        choices=STATUSES,
        default=NEW,
    )
    project = models.ForeignKey(Project, related_name='tasks', on_delete=models.CASCADE)
    estimated_time = models.DecimalField(max_digits=5, decimal_places=2, default=0)

    # task estimations


