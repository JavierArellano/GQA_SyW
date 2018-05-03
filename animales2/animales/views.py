from django.shortcuts import render
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.core.serializers import serialize
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
import json 
from django.core.serializers.json import DjangoJSONEncoder
from django.views.decorators.csrf import csrf_exempt

from models import *

def animals(request):
	queryset = Animal.objects.filter(**request.GET.dict()).values('name', 'state', 'animal_type', 'race', 'profile', 'color', 'age', 'genre', 'vaccinated', 'description') 
	serialized_q = json.dumps(list(queryset), cls=DjangoJSONEncoder)
	return HttpResponse(serialized_q)

def user(request):
	"""
	TODO: obtener la ciudad y a partir de esta el pais y anadirlos al JSON de respuesta
	igual que he hecho con los datos del user.
	"""
	queryset = Profile.objects.filter(**request.GET.dict()).values()
	lista = list(queryset)
	lista[0]['user']=list(User.objects.filter(id=lista[0]['user_id']).values('username','email','first_name','last_name'))
	serialized_q = json.dumps(lista, cls=DjangoJSONEncoder)
	return HttpResponse(serialized_q)

def cities(request):
	#hay que introducir datos en el sistema, para terminarla
	import ipdb;ipdb.set_trace()
	query = Country.objects.all().values()
	country_list = list(query)
	queryset = City.objects.all().values()
	serialized_q = json.dumps(list(queryset), cls=DjangoJSONEncoder)
	return HttpResponse(serialized_q)

def animal_type(request):
	import ipdb;ipdb.set_trace()
	query = AnimalType.objects.all().values()
	tipes = list(query)
	for tipo in tipes:
		tipo['race']=list(Race.objects.filter(type_animal_id=tipo['id']).values('id','name'))
	serialized_q = json.dumps(tipes, cls=DjangoJSONEncoder)
	return HttpResponse(serialized_q)

def animal_image(request):
	import ipdb;ipdb.set_trace()
	queryset = AnimalImage.objects.filter(request.GET[animal_id]).values()
	return HttpResponse(queryset)

@csrf_exempt
def newAnimal(request):
	#import ipdb;ipdb.set_trace()
	new_animal=Animal()
	new_animal.animal_type_id = request.POST['animal_type']
	new_animal.race_id = request.POST['race']
	new_animal.profile_id =request.POST['profile']
	new_animal.state = request.POST['state']
	new_animal.name = request.POST['name']
	new_animal.color = request.POST['color']
	new_animal.age = request.POST['age']
	new_animal.genre = request.POST['genre']
	new_animal.vaccinated = request.POST['vaccinated']
	new_animal.description = request.POST['description']
	new_animal.save()
	return HttpResponseRedirect("/animal")

@csrf_exempt
def registration(request):
	#import ipdb;ipdb.set_trace()
	new_user=User()
	new_user.username = request.POST['username']
	new_user.password = request.POST['password']
	new_user.email = request.POST['email']
	new_user.first_name = request.POST['first_name']
	new_user.last_name = request.POST['last_name']
	new_user.save()
	profile = Profile()
	profile.user_id = new_user.id
	profile.city_id = request.POST['city']
	return HttpResponseRedirect("/animal")


@csrf_exempt
def login(request):
	import ipdb;ipdb.set_trace()
	user = authenticate(username='algo', password='1234')
	if user is not None:
		return HttpResponse(list(user))
	else:
		return None# No backend authenticated the credentials