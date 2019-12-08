ls :
	ls -lah
django :
	docker exec -it rest_django bash
react :
	docker exec -it rest_react /bin/sh
db :
	docker exec -it rest_db bash
maria :
	docker exec -it rest_db mysql -u root -proot
nginx :
	docker exec -it rest_nginx /bin/sh
watch :
	docker exec rest_react npm run watch --colors
build :
	docker exec rest_react npm run build
