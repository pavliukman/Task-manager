from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^task/(?P<pk>[0-9]+)/$', views.TaskDetail.as_view()),
    url(r'^tasks/(?P<pk>[0-9]+)/$', views.TaskList.as_view()),
    url(r'^tasks', views.TaskList.as_view()),
    url(r'^project/(?P<pk>[0-9]+)/$', views.ProjectDetail.as_view()),
    url(r'^projects', views.ProjectList.as_view()),
    url(r'^users/(?P<username>.+)/$', views.UsersList.as_view(), name="search"),
    url(r'^users', views.UsersList.as_view()),
]
