from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.core.serializers import serialize
import json 
from django.core.serializers.json import DjangoJSONEncoder 

from models import *

def animals(request):
	queryset = Animal.objects.all().values('name', 'state', 'animal_type', 'race', 'profile', 'color', 'age', 'genre', 'vaccinated', 'description') 
	serialized_q = json.dumps(list(queryset), cls=DjangoJSONEncoder)
	return HttpResponse(serialized_q)

def animal(request):
	animal = Animal.objects.filter(color=request.GET['color'], race=request.GET['race'])
	return render(request, "animales/test.html", locals())