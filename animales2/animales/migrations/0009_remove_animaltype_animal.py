# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2018-05-03 18:36
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('animales', '0008_auto_20180423_1809'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='animaltype',
            name='animal',
        ),
    ]