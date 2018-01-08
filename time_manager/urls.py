from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^tasks', views.TaskList.as_view()),
    url(r'^projects', views.ProjectList.as_view()),
]