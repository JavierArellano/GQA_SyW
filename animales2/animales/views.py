from django.shortcuts import render
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.core.serializers import serialize
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from oauth2_provider.views.generic import ProtectedResourceView
import json 
from django.core.serializers.json import DjangoJSONEncoder
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from models import *

class animals(ProtectedResourceView):
	def get(self, request, *args, **kwargs):
		queryset = Animal.objects.filter(**request.GET.dict()).values('name', 'state', 'animal_type', 'race', 'profile', 'color', 'age', 'genre', 'vaccinated', 'description') 
		serialized_q = json.dumps(list(queryset), cls=DjangoJSONEncoder)
		return HttpResponse(serialized_q)


class user(ProtectedResourceView):
	def get(self, request):
		#import ipdb;ipdb.set_trace()
		queryset = Profile.objects.filter(**request.GET.dict()).values()
		lista = list(queryset)
		algo=list(User.objects.filter(id=lista[0]['user_id']).values('username','email','first_name','last_name'))
		lista[0]['user']=algo[0]
		algo=list(City.objects.filter(id=lista[0]['city_id']).values())
		lista[0]['ciudad']=algo[0]
		algo=list(Country.objects.filter(id=algo[0]['country_id']))
		lista[0]['pais']=algo[0]
		del lista[0]['user_id']
		del lista[0]['city_id']
		serialized_q = json.dumps(lista, cls=DjangoJSONEncoder)
		return HttpResponse(serialized_q)


class cities(ProtectedResourceView):
	def get(self, request):
		query = Country.objects.all().values()
		country_list = list(query)
		for country in country_list:
			country['cities']=list(City.objects.filter(country_id=country['id']).values('id','name'))
		serialized_q = json.dumps(list(country_list), cls=DjangoJSONEncoder)
		return HttpResponse(serialized_q)


class animal_type(ProtectedResourceView):
	def get(self, request):
		query = AnimalType.objects.all().values()
		tipes = list(query)
		for tipo in tipes:
			tipo['race']=list(Race.objects.filter(type_animal_id=tipo['id']).values('id','name'))
		serialized_q = json.dumps(tipes, cls=DjangoJSONEncoder)
		return HttpResponse(serialized_q)


class animal_image(ProtectedResourceView):
	def get(self, request):
		import ipdb;ipdb.set_trace()
		queryset = AnimalImage.objects.filter(request.GET[animal_id]).values()
		return HttpResponse(queryset)


@method_decorator(csrf_exempt, name='dispatch')
class newAnimal(ProtectedResourceView):
	def post(self, request):
		#import ipdb;ipdb.set_trace()
		data = json.loads(request.body)
		new_animal=Animal()
		new_animal.animal_type_id = data['animal_type']
		new_animal.race_id = data['race']
		new_animal.profile_id =data['profile']
		new_animal.state = data['state']
		new_animal.name = data['name']
		new_animal.color = data['color']
		new_animal.age = data['age']
		new_animal.genre = data['genre']
		new_animal.vaccinated = data['vaccinated']
		new_animal.description = data['description']
		new_animal.save()
		return HttpResponse(status=200)


@method_decorator(csrf_exempt, name='dispatch')
class registration(ProtectedResourceView):
	def post(self, request):
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
		profile.save()
		return HttpResponse(status=200)
		

class login(ProtectedResourceView):
	@csrf_exempt
	def post(request):
		import ipdb;ipdb.set_trace()
		user = authenticate(username='algo', password='1234')
		if user is not None:
			return HttpResponse(status=200)
		else:
			return HttpResponse(status=401)