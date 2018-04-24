from django.shortcuts import render
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.core.serializers import serialize
from django.contrib.auth.models import User
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

@csrf_exempt
def newAnimal(request):
	import ipdb;ipdb.set_trace()
	nuevo_animal=Animal()
	nuevo_animal.animal_type_id = request.POST['animal_type']
	nuevo_animal.race_id = request.POST['race']
	nuevo_animal.profile_id =request.POST['profile']
	nuevo_animal.state = request.POST['state']
	nuevo_animal.name = request.POST['name']
	nuevo_animal.color = request.POST['color']
	nuevo_animal.age = request.POST['age']
	nuevo_animal.genre = request.POST['genre']
	nuevo_animal.vaccinated = request.POST['vaccinated']
	nuevo_animal.description = request.POST['description']
	nuevo_animal.save()
	return HttpResponseRedirect("/animal")
