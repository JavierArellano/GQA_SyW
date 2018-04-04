# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2018-04-04 15:35
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Animal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('state', models.CharField(blank=True, choices=[('Adopci\xf3n', 'Adopci\xf3n'), ('Perdido', 'Perdido'), ('Encontrado', 'Encontrado'), ('Acogida', 'Acogida'), ('Otro', 'Otro')], default='Otro', max_length=200, verbose_name='Estado')),
                ('name', models.CharField(blank=True, max_length=200, null=True, verbose_name='Nombre')),
                ('color', models.CharField(blank=True, help_text='Por ejemplo: Marr\xf3n y Negro', max_length=200, null=True, verbose_name='Color')),
                ('age', models.CharField(blank=True, help_text='Por ejemplo: 2 meses', max_length=200, null=True, verbose_name='Edad')),
                ('genre', models.CharField(blank=True, choices=[('Macho', 'Macho'), ('Hembra', 'Hembra'), ('Otro', 'Otro')], default='Otro', max_length=200, verbose_name='Sexo')),
                ('vaccinated', models.BooleanField(default=False, verbose_name='Vacunado')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Descripci\xf3n')),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_updated', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='AnimalImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='images', verbose_name='Imagen')),
                ('alt', models.CharField(blank=True, max_length=200, null=True, verbose_name='Alt')),
            ],
        ),
        migrations.CreateModel(
            name='AnimalType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('species', models.CharField(blank=True, max_length=200, verbose_name='Tipo de Animal')),
            ],
        ),
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=200, null=True, verbose_name='Ciudad')),
            ],
        ),
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=200, null=True, verbose_name='Pa\xeds')),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('country', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='countriesP', to='animales.Country', verbose_name='Pa\xeds')),
                ('user', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='users', to=settings.AUTH_USER_MODEL, verbose_name='Usuario')),
            ],
        ),
        migrations.CreateModel(
            name='Race',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=200, null=True, verbose_name='Raza')),
                ('type_animal', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='type', to='animales.AnimalType', verbose_name='Tipo de Animal')),
            ],
        ),
        migrations.AddField(
            model_name='city',
            name='country',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='countriesC', to='animales.Country', verbose_name='Pa\xeds'),
        ),
        migrations.AddField(
            model_name='animal',
            name='image',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='images', to='animales.AnimalImage', verbose_name='Imagen'),
        ),
        migrations.AddField(
            model_name='animal',
            name='profile',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='profiles', to='animales.Profile', verbose_name='Perfil'),
        ),
        migrations.AddField(
            model_name='animal',
            name='type_animal',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='types', to='animales.AnimalType', verbose_name='Tipo de Animal'),
        ),
    ]
