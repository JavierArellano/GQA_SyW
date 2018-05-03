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
* http://localhost:8000/user?user_id=X - GET - obtiene un user
