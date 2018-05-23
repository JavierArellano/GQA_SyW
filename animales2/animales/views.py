from django.shortcuts import render
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.core.serializers import serialize
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from oauth2_provider.views.generic import ProtectedResourceView
import json 
from django.core.serializers.json import DjangoJSONEncoder
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from django.utils.decorators import method_decorator


from models import *

class animals(ProtectedResourceView):
	def get(self, request, *args, **kwargs):
		#import ipdb;ipdb.set_trace()
		queryset = Animal.objects.filter(**request.GET.dict()).values('id','name', 'state', 'animal_type', 'race', 'profile', 'color', 'age', 'genre', 'vaccinated', 'description') 
		serialized_q = json.dumps(list(queryset), cls=DjangoJSONEncoder)
		return HttpResponse(serialized_q)

class yo(ProtectedResourceView):
	def get(self, request, *args, **kwargs):
		import ipdb;ipdb.set_trace()
		queryset = Animal.objects.filter(**request.GET.dict()).values('id','name', 'state', 'animal_type', 'race', 'profile', 'color', 'age', 'genre', 'vaccinated', 'description') 
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
		lista = list(AnimalImage.objects.filter(animal_id=request.GET['animal_id']).values())
		queryset = json.dumps(lista, cls=DjangoJSONEncoder)
		return HttpResponse(queryset)


@method_decorator(csrf_exempt, name='dispatch')
class newAnimal(ProtectedResourceView):
	def post(self, request):
		import ipdb;ipdb.set_trace()
		data = json.loads(request.body)
		new_animal=Animal()
		new_animal.animal_type_id = data['animal_type']
		new_animal.race_id = data['race']
		new_animal.profile_id = Profile.objects.filter(user_id=request.user.id)[0].id
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
class XMLnewAnimal(ProtectedResourceView):
	def post(self, request):
		from django.core.files.base import ContentFile
		import base64
		import uuid
		import ipdb;ipdb.set_trace()
		data = json.loads(request.body)
		new_animal=Animal()
		new_animal.animal_type_id = data['animal_type']
		new_animal.race_id = data['race']
		new_animal.profile_id = Profile.objects.filter(user_id=request.user.id)[0].id
		new_animal.state = data['state']
		new_animal.name = data['name']
		new_animal.color = data['color']
		new_animal.age = data['age']
		new_animal.genre = data['genre']
		new_animal.vaccinated = data['vaccinated']
		new_animal.description = data['description']
		new_animal.save()

		data2 = self.decoder(data['image'])

		new_animal_image = AnimalImage()
		new_animal_image.image = data2
		new_animal_image.animal_id = new_animal.id
		new_animal_image.save()

		return HttpResponse(status=200)

	def decoder(self, file):
		from django.core.files.base import ContentFile
		import base64
		import uuid

		try:
			decoded_file = base64.b64decode(file['value'])
		except TypeError:
			self.fail('invalid_image')

		# Generate file name:
		file_name = str(uuid.uuid4())[:12] # 12 characters are more than enough.
		# Get the file name extension:
		file_extension = self.extension(file['filetype'])

		complete_file_name = "%s.%s" % (file_name, file_extension, )
		data = ContentFile(decoded_file, name=complete_file_name)
		return data

	def extension(self, filetype):
		extension = filetype.split('/')[1]
		return extension

@method_decorator(csrf_exempt, name='dispatch')
class editAnimal(ProtectedResourceView):
	def post(self, request):
		#import ipdb;ipdb.set_trace()
		data = json.loads(request.body)
		animal = Animal.objects.get(id=data['id'])
		animal.animal_type_id = data['animal_type']
		animal.race_id = data['race']
		animal.profile_id = Profile.objects.filter(user_id=request.user.id)[0].id
		animal.state = data['state']
		animal.name = data['name']
		animal.color = data['color']
		animal.age = data['age']
		animal.genre = data['genre']
		animal.vaccinated = data['vaccinated']
		animal.description = data['description']
		animal.save()
		return HttpResponse(status=200)


@method_decorator(csrf_exempt, name='dispatch')
class deleteAnimal(ProtectedResourceView):
	def post(self, request):
		#import ipdb;ipdb.set_trace()
		data = json.loads(request.body)
		Animal.objects.get(id=data['id']).delete()
		return HttpResponse(status=200)


@method_decorator(csrf_exempt, name='dispatch')
class registration(View):
	def post(self, request):
		#import ipdb;ipdb.set_trace()
		data = json.loads(request.body)
		city_id = data['city']
		del data['city']
		new_user=User.objects.create_user(**data)
		new_user.save()
		profile = Profile()
		profile.user_id = new_user.id
		profile.city_id = city_id
		profile.save()
		return HttpResponse(status=200)
