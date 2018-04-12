# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2018-04-12 16:01
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('animales', '0005_auto_20180412_1558'),
    ]

    operations = [
        migrations.AddField(
            model_name='animal',
            name='animal_type',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='animal_types', to='animales.AnimalType', verbose_name='Tipo de animal'),
        ),
        migrations.AddField(
            model_name='animal',
            name='race',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='races', to='animales.Race', verbose_name='Raza'),
        ),
    ]