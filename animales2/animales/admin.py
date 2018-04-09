from django.contrib import admin


from .models import *

admin.site.register(Animal)
admin.site.register(AnimalType)
admin.site.register(Race)
admin.site.register(Profile)
admin.site.register(Country)
admin.site.register(City)
admin.site.register(AnimalImage)