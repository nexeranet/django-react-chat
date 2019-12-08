app=appname

#django
django:
	docker exec -it rest_django bash
s :
	python3 manage.py runserver
m :
	python3 manage.py migrate
mm :
	python3 manage.py makemigrations

sm :
	docker exec -it rest_django python3 manage.py migrate
smm :
	docker exec -it rest_django python3 manage.py makemigrations
ma:
	python3 manage.py startapp $(app)
cs:
	docker exec -it rest_django python3 manage.py collectstatic


#redis
rd:
	brew services stop redis
ru:
	brew services start redis
rserver:
	redis-server
