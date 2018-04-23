from django.conf.urls import url, include

from animales import views


urlpatterns = [
    url(r'^filter_animal', views.animal_filter, name="filter_animal"),
    url(r'^$', views.animals, name="animals"),
    url(r'^animal', views.animaluid, name='animaluid'),
]