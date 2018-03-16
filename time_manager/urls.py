from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^tasks', views.TaskList.as_view()),
    url(r'^project/(?P<pk>[0-9]+)/$', views.ProjectDetail.as_view()),
    url(r'^projects', views.ProjectList.as_view()),
]
