from django.conf.urls import url, include

from animales import views


urlpatterns = [
    url(r'^yo', views.yo.as_view(), name='yo'),
    url(r'^animal', views.animals.as_view(), name='animals'),
    url(r'^imagen', views.animal_image.as_view(), name='image'),
    url(r'^user', views.user.as_view(), name='user'),
    url(r'^nuevo_animal', views.newAnimal.as_view(), name='newAnimal'),
    url(r'^edit_animal', views.editAnimal.as_view(), name='editAnimal'),
    url(r'^tipo', views.animal_type.as_view(), name='tipo'),
    url(r'^registro', views.registration.as_view(), name='registration'),
    url(r'^ciudades', views.cities.as_view(), name='cities'),
]