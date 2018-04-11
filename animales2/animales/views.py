from django.shortcuts import render
from django.http import HttpResponse

from models import *

def index(request):
	animals = Animal.objects.all()
	return render(request, "animales/index.html", locals())

def animal(request):
	animal = Animal.objects.filter(color=request.GET['color'], race=request.GET['race'])
	return render(request, "animales/test.html", locals())