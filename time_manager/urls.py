from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.TaskList.as_view()),
]