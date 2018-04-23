from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.core.serializers import serialize
from django.contrib.auth.models import User
import json 
from django.core.serializers.json import DjangoJSONEncoder 

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
	import ipdb;ipdb.set_trace()
	queryset = Profile.objects.filter(**request.GET.dict()).values()
	lista = list(queryset)
	lista[0]['user']=list(User.objects.filter(id=lista[0]['user_id']).values('username','email','first_name','last_name'))
	serialized_q = json.dumps(lista, cls=DjangoJSONEncoder)
	return HttpResponse(serialized_q)
