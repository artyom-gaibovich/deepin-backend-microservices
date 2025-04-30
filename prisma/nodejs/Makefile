.PHONY: build push run stop rm restart

include ../.env
export $(shell sed 's/=.*//' ../.env)

REGISTRY=my-registry.com
IMAGE_NAME=$(REGISTRY)/my-nest-app
TAG=$(NODE_ENV)

build:
	docker build -t $(IMAGE_NAME):$(TAG) -f docker/nodejs/Dockerfile .

push: build
	docker push $(IMAGE_NAME):$(TAG)

run:
	docker run -d --name nest_app -p $(PORT):$(PORT) --restart always $(IMAGE_NAME):$(TAG)

stop:
	docker stop nest_app || true

rm:
	docker rm nest_app || true

restart: stop rm run
