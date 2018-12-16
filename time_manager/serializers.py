from rest_framework import serializers
from django.contrib.auth.models import User

from time_manager.models import Task, Project
import logging
from django.db import transaction

logger = logging.getLogger('Logger')


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class TaskSerializer(serializers.ModelSerializer):
    assigned_to_user = UserSerializer(
        source='get_assigned_user', many=False, read_only=True)

    class Meta:
        model = Task
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)
    assigned_to_users_object = UserSerializer(
        source='get_assigned_to_users', many=True, read_only=True)
    can_edit = UserSerializer(many=True, read_only=True)
    can_edit_users_object = UserSerializer(
        source='get_can_edit_users', many=True, read_only=True)

    class Meta:
        model = Project
        fields = '__all__'
