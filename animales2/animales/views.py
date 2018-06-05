from django.shortcuts import render
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.core.serializers import serialize
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from oauth2_provider.views.generic import ProtectedResourceView
import json 
import os
from django.core.serializers.json import DjangoJSONEncoder
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from django.utils.decorators import method_decorator

from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from animales2.settings import DEFAULT_FROM_EMAIL
from django.db.models.query_utils import Q
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.template import loader
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode


from models import *


class animals(View):
	def get(self, request, *args, **kwargs):
		#import ipdb;ipdb.set_trace()
		queryset = Animal.objects.filter(**request.GET.dict()).values('id','name', 'state', 'animal_type', 'race', 'profile', 'color', 'age', 'genre', 'vaccinated', 'description') 
		respuestas = list(queryset)
		for respuesta in respuestas:
			tipo = AnimalType.objects.get(id=respuesta['animal_type'])
			raza = Race.objects.get(id=respuesta['race'])
			respuesta['race'] = raza.name
			respuesta['animal_type'] = tipo.species
		serialized_q = json.dumps(respuestas, cls=DjangoJSONEncoder)
		return HttpResponse(serialized_q)


class myAnimals(ProtectedResourceView):
	def get(self, request):
		#import ipdb;ipdb.set_trace()
		queryset = Animal.objects.filter(profile_id=Profile.objects.filter(user_id=request.user.id)[0].id).values('id','name', 'state', 'animal_type', 'race', 'profile', 'color', 'age', 'genre', 'vaccinated', 'description') 
		respuestas = list(queryset)
		for respuesta in respuestas:
			tipo = AnimalType.objects.get(id=respuesta['animal_type'])
			raza = Race.objects.get(id=respuesta['race'])
			respuesta['race'] = raza.name
			respuesta['animal_type'] = tipo.species
		serialized_q = json.dumps(respuestas, cls=DjangoJSONEncoder)
		return HttpResponse(serialized_q)


class user(ProtectedResourceView):
	def get(self, request):
		#import ipdb;ipdb.set_trace()
		queryset = Profile.objects.filter(user_id=request.user.id).values()
		lista = list(queryset)
		algo=list(User.objects.filter(id=lista[0]['user_id']).values('username','email','first_name','last_name'))
		lista[0]['user']=algo[0]
		algo=list(City.objects.filter(id=lista[0]['city_id']).values())
		lista[0]['ciudad']=algo[0]
		cid = algo[0]['country_id']
		del algo[0]['country_id']
		algo=list(Country.objects.filter(id=cid).values())
		lista[0]['pais']=algo[0]
		del lista[0]['user_id']
		del lista[0]['city_id']
		serialized_q = json.dumps(lista, cls=DjangoJSONEncoder)
		return HttpResponse(serialized_q)


class cities(View):
	def get(self, request):
		query = Country.objects.all().values()
		country_list = list(query)
		for country in country_list:
			country['cities']=list(City.objects.filter(country_id=country['id']).values('id','name'))
		serialized_q = json.dumps(list(country_list), cls=DjangoJSONEncoder)
		return HttpResponse(serialized_q)


class animal_type(View):
	def get(self, request):
		query = AnimalType.objects.all().values()
		tipes = list(query)
		for tipo in tipes:
			tipo['race']=list(Race.objects.filter(type_animal_id=tipo['id']).values('id','name'))
		serialized_q = json.dumps(tipes, cls=DjangoJSONEncoder)
		return HttpResponse(serialized_q)


class animal_image(View):
	def get(self, request):
		#import ipdb;ipdb.set_trace()
		lista = list(AnimalImage.objects.filter(animal_id=request.GET['animal_id']).values())
		if len(lista)>0:
			nombre,extension = lista[0]['image'].split('.')
			return HttpResponse(open("media/"+lista[0]['image']),content_type="image/"+extension)
		queryset = json.dumps(lista, cls=DjangoJSONEncoder)
		return HttpResponse(queryset)


@method_decorator(csrf_exempt, name='dispatch')
class newAnimal(ProtectedResourceView):
	def post(self, request):
		#import ipdb;ipdb.set_trace()
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
		if data['image']:
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
		animal.state = data['state']
		animal.name = data['name']
		animal.color = data['color']
		animal.age = data['age']
		animal.genre = data['genre']
		animal.vaccinated = data['vaccinated']
		animal.description = data['description']
		animal.save()

		if data['image']:
			lista = list(AnimalImage.objects.filter(animal_id=animal.id).values())
			if len(lista)>0:
				os.remove("media/"+lista[0]['image'])
			AnimalImage.objects.filter(animal_id=animal.id).delete()
			data2 = self.decoder(data['image'])

			new_animal_image = AnimalImage()
			new_animal_image.image = data2
			new_animal_image.animal_id = animal.id
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
class deleteAnimal(ProtectedResourceView):
	def post(self, request):
		import ipdb;ipdb.set_trace()
		data = json.loads(request.body)
		lista = list(AnimalImage.objects.filter(animal_id=data['id']).values())
		if len(lista)>0:
			os.remove("media/"+lista[0]['image'])
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

@method_decorator(csrf_exempt, name='dispatch')
class password_reset(View):
	def post(self, request):
		import ipdb;ipdb.set_trace()
		#data = json.loads(request.body)
		datos = request.POST['email']
		if self.validate_email_address(datos):
			associated_users = User.objects.filter(Q(email=datos)|Q(username=datos))
			if associated_users.exists():
				for user in associated_users:
					c = {
					'email':user.email,
					'domain':'guauqueanimales.com',
					'site_name': 'Guau que Animales',
					'uid':urlsafe_base64_encode(force_bytes(user.pk)),
					'user':user,
					'token':default_token_generator.make_token(user),
					'protocol':'http',
					}
					subject_template_name='animales/password_reset_subject.txt'
					email_template_name='animales/password_reset_email.html'
					subject = loader.render_to_string(subject_template_name, c)
					subject = ''.join(subject.splitlines())
					email = loader.render_to_string(email_template_name, c)
					send_mail(subject, email, DEFAULT_FROM_EMAIL, [user.email], fail_silently=False)
				return HttpResponse(status=200)
			return HttpResponse('No user is associated with this email address.')
		else:
			associated_users = User.objects.filter(username=datos)
			if associated_users.exists():
				for user in associated_users:
					c = {
					'email':user.email,
					'domain':'guauqueanimales.com',
					'site_name': 'Guau que Animales',
					'uid':urlsafe_base64_encode(force_bytes(user.pk)),
					'user':user,
					'token':default_token_generator.make_token(user),
					'protocol':'http',
					}
					subject_template_name='django/contrib/admin/templates/registration/password_reset_subject.txt'
					email_template_name='django/contrib/admin/templates/registration/password_reset_email.html'
					subject = loader.render_to_string(subject_template_name, c)
					subject = ''.join(subject.splitlines())
					email = loader.render_to_string(email_template_name, c)
					send_mail(subject, email, DEFAULT_FROM_EMAIL, [user.email], fail_silently=False)
				return HttpResponse(status=200)
			return HttpResponse('No user is associated with this username.')


	def validate_email_address(self, email):
		try:
			validate_email(email)
			return True
		except ValidationError as e:
			return False


@method_decorator(csrf_exempt, name='dispatch')
class PasswordResetConfirmView(View):
	def post(self, request, uidb64=None, token=None, *arg, **kwargs):
		"""
		View that checks the hash in a password reset link and presents a
		form for entering a new password.
		"""
		import ipdb;ipdb.set_trace()
		#data = json.loads(request.body)
		UserModel = get_user_model()
		datos = request.POST['new_password2']
		assert uidb64 is not None and token is not None  # checked by URLconf
		try:
			uid = urlsafe_base64_decode(uidb64)
			user = UserModel._default_manager.get(pk=uid)
		except (TypeError, ValueError, OverflowError, UserModel.DoesNotExist):
			user = None

		if user is not None and default_token_generator.check_token(user, token):
			new_password= request.POST['new_password2']
			user.set_password(new_password)
			user.save()
			return HttpResponse('Password has been reset.')
		else:
			return HttpResponse('The reset password link is no longer valid.')
