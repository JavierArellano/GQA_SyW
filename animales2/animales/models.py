# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import User
from easy_thumbnails.fields import ThumbnailerImageField

from django.db import models
CH_STATE = (
    (u'Adopción', u'Adopción'),
    (u'Perdido', u'Perdido'),
    (u'Encontrado', u'Encontrado'),
    (u'Acogida',u'Acogida'),
    (u'Otro',u'Otro'),
)
CH_GENRE = (
    (u'Macho', u'Macho'),
    (u'Hembra',u'Hembra'),
    (u'Otro', u'Otro'),
)

# Create your models here.
class Animal(models.Model):

    type_animal = models.ForeignKey('AnimalType', verbose_name=u'Tipo de Animal',
        blank=True, null=False, related_name='types')
    profile = models.ForeignKey('Profile', verbose_name=u'Perfil',
        blank=True, null=False, related_name='profiles')
    image = models.ForeignKey('AnimalImage', verbose_name=u'Imagen',
        blank=True, null=False, related_name='images')
    state = models.CharField(verbose_name=u'Estado', max_length=200,
        blank=True, null=False, choices=CH_STATE, default='Otro')
    name = models.CharField(verbose_name=u'Nombre', max_length=200,
        blank=True, null=True)
    color = models.CharField(verbose_name=u'Color', max_length=200,
        blank=True, null=True, help_text=u'Por ejemplo: Marrón y Negro')
    age = models.CharField(verbose_name=u'Edad', max_length=200,
        blank=True, null=True, help_text=u'Por ejemplo: 2 meses')
    genre = models.CharField(verbose_name=u'Sexo', max_length=200,
        blank=True, null=False, choices=CH_GENRE, default='Otro')
    #Modificar el campo vacunado, hay que pasar choices.
    vaccinated = models.BooleanField(verbose_name='Vacunado',
        blank=True, null=False, default=False)

    description = models.TextField(verbose_name=u'Descripción',
        blank=True, null=True)
    date_created = models.DateTimeField(null=False, auto_now_add=True)
    date_updated = models.DateTimeField(null=False, auto_now=True)


class AnimalType(models.Model):

    species = models.CharField(verbose_name=u'Tipo de Animal', max_length=200,
        blank=True, null=False)


class Race(models.Model):

    type_animal = models.ForeignKey('AnimalType', verbose_name=u'Tipo de Animal',
        blank=True, null=False, related_name='type')
    name = models.CharField(verbose_name=u'Raza', max_length=200,
        blank=True, null=True)



class Profile(models.Model):
    
    user = models.ForeignKey(User, verbose_name=u'Usuario',
        blank=True, null=False, related_name='users')
    country = models.ForeignKey('Country', verbose_name=u'País',
        blank=True, null=False, related_name='countriesP')

    

class Country(models.Model):

    name = models.CharField(verbose_name=u'País', max_length=200,
        blank=True, null=True)


class City(models.Model):
        
    country = models.ForeignKey('Country', verbose_name=u'País',
        blank=True, null=False, related_name='countriesC')
    name = models.CharField(verbose_name=u'Ciudad', max_length=200,
        blank=True, null=True)


class AnimalImage(models.Model):

    """image = models.ImageField(upload_to='images', verbose_name=u'Imagen',
        null=False, blank=False, max_length=None)"""
    image = ThumbnailerImageField(upload_to='images', blank=True)
    alt = models.CharField(verbose_name=u'Alt', max_length=200,
        blank=True, null=True)