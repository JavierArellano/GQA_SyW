from django.conf.urls import url, include

from animales import views


urlpatterns = [
    url(r'^animal', views.animals, name='animals'),
    url(r'^imagen', views.animal_image, name='image'),
    url(r'^user', views.user, name='user'),
    url(r'^nuevo_animal', views.newAnimal, name='newAnimal'),
    url(r'^registro', views.registration, name='registration'),
    url(r'^login', views.login, name='login'),
    url(r'^ciudades', views.cities, name='cities'),
]