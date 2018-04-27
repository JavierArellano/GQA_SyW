from django.conf.urls import url, include

from animales import views


urlpatterns = [
    url(r'^animal', views.animals, name='animals'),
    url(r'^user', views.user, name='user'),
    url(r'^nuevo_animal', views.newAnimal, name='newAnimal'),
    url(r'^registro', views.registration, name='registration'),
    url(r'^login', views.login, name='login'),
]