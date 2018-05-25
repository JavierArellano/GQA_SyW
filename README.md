# Deployment

* git clone http://git.lecrintech.com/joseaminan/animales2.git
* cd animales2
* virtualenv env (si el entorno virtual no existe)
* source env/bin/activate
* pip install -r requirements.txt
* cd animales2
* python manage.py runserver
* http://localhost:8000/animal

# Doc

* http://localhost:8000/animal - GET - obtener todos los animales
* http://localhost:8000/ciudades - GET - obtener todos los paises con sus ciudades NO NECESITA TOKEN
* http://localhost:8000/user?user_id=X - GET - obtiene un user
* http://localhost:8000/imagen?animal_id=X - GET - obtiene la imagen del animal NO NECESITA TOKEN
* http://localhost:8000/tipo - GET - obtiene todos los tipos de animal y las razas de cada tipo.

* http://localhost:8000/edit_animal - POST - modificar un animal hay que pasar la id del animal y todos los datos
* http://localhost:8000/delete_animal - POST - borrar el animal solo es necesaria la id
* http://localhost:8000/registro - POST - crear un nuevo usuario en la aplicación "username, password, email, first_name, last_name, city" NO NECESITA TOKEN
* http://localhost:8000/nuevo_animal - POST - crea un nuevo animal en la BD

animal_type:1
race:1
state:(
    (u'Adopción', u'Adopción'),
    (u'Perdido', u'Perdido'),
    (u'Encontrado', u'Encontrado'),
    (u'Acogida',u'Acogida'),
    (u'Otro',u'Otro')
)
name:chucho
color:marron
genre:(
    (u'Macho', u'Macho'),
    (u'Hembra',u'Hembra'),
    (u'Otro', u'Otro')
)
vaccinated:True
description:Se ha perdido
age:1 año
