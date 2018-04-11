from django.conf.urls import url, include

from animales import views


urlpatterns = [
    url(r'^$', views.index, name="index"),
    url(r'^animal/q/$', views.animal, name='animal')
]