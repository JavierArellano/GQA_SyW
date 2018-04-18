from django.conf.urls import url, include

from animales import views


urlpatterns = [
    url(r'^$', views.animals, name="animals"),
    url(r'^animal/q/$', views.animal, name='animal')
]