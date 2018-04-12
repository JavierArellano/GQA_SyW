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


class Animal(models.Model):
    animal_type = models.ForeignKey('AnimalType', verbose_name=u'Tipo de animal',
        blank=False, null=True, related_name='animal_types')
    race = models.ForeignKey('Race', verbose_name=u'Raza',
        blank=False, null=True, related_name='races')
    profile = models.ForeignKey('Profile', verbose_name=u'Perfil',
        blank=False, null=True, related_name='animals')
    state = models.CharField(verbose_name=u'Estado', max_length=200,
        blank=False, null=True, choices=CH_STATE, default='Otro')
    name = models.CharField(verbose_name=u'Nombre', max_length=200,
        blank=False, null=True)
    color = models.CharField(verbose_name=u'Color', max_length=200,
        blank=False, null=True, help_text=u'Por ejemplo: Marrón y Negro')
    age = models.CharField(verbose_name=u'Edad', max_length=200,
        blank=False, null=True, help_text=u'Por ejemplo: 2 meses')
    genre = models.CharField(verbose_name=u'Sexo', max_length=200,
        blank=False, null=True, choices=CH_GENRE, default='Otro')
    vaccinated = models.BooleanField(verbose_name=u'Vacunado',
        blank=False, null=False, default=False)

    description = models.TextField(verbose_name=u'Descripción',
        blank=True, null=True)
    date_created = models.DateTimeField(null=False, auto_now_add=True)
    date_updated = models.DateTimeField(null=False, auto_now=True)

    def __str__(self):
        return u'Nombre: '+self.name


class AnimalType(models.Model):
    species = models.CharField(verbose_name=u'Tipo de Animal', max_length=200,
        blank=True, null=False)
    animal = models.ForeignKey('Animal', verbose_name=u'Tipo de Animal',
        blank=False, null=True, related_name='types')

    def __unicode__(self):
        return self.species


class Race(models.Model):
    type_animal = models.ForeignKey('AnimalType', verbose_name=u'Tipo de Animal',
        blank=True, null=False, related_name='races')
    name = models.CharField(verbose_name=u'Raza', max_length=200,
        blank=True, null=True)

    def __unicode__(self):
        return self.name



class Profile(models.Model):
    user = models.ForeignKey(User, verbose_name=u'Usuario',
        blank=True, null=False, related_name='users')
    country = models.ForeignKey('Country', verbose_name=u'País',
        blank=True, null=False, related_name='countriesP')

    def __unicode__(self):
        return self.user.username

    class Meta:
        verbose_name=u'Perfil de usuario'
        verbose_name_plural=u'Perfiles de usuario'

    

class Country(models.Model):
    name = models.CharField(verbose_name=u'País', max_length=200,
        blank=True, null=True)

    def __unicode__(self):
        return self.name


class City(models.Model):
    country = models.ForeignKey('Country', verbose_name=u'País',
        blank=True, null=False, related_name='countriesC')
    name = models.CharField(verbose_name=u'Ciudad', max_length=200,
        blank=True, null=True)

    def __unicode__(self):
        return self.name



class AnimalImage(models.Model):
    image = ThumbnailerImageField(upload_to='images', blank=True)
    animal = models.ForeignKey('Animal', verbose_name=u'Imagen',
        blank=False, null=True, related_name='images')

    def __unicode__(self):
        return self.id