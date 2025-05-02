

run-many:
		nx run-many --target=serve --projects=deepin-backend-microservices,deepin-backend-microservices --parallel=2



run-micro:
	nx serve deepin-backend-microservices

run-backend:
	nx serve deepin-backend-admin


run-micro-many:
	nx serve deepin-backend-microservices --port=4200



rm:
	docker compose -f docker-compose.yml down --remove-orphans



rm-vol:
	docker compose down --volumes --remove-orphans
