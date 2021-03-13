ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
$(eval $(ARGS):;@:)

MAKEFLAGS += --silent
DOCKER_COMPOSE = docker-compose -f docker-compose.yml

list:
	sh -c "echo; $(MAKE) -p no_targets__ | awk -F':' '/^[a-zA-Z0-9][^\$$#\/\\t=]*:([^=]|$$)/ {split(\$$1,A,/ /);for(i in A)print A[i]}' | grep -v '__\$$' | grep -v 'Makefile'| sort"

#############################
# Docker machine states
#############################
dc:
	$(DOCKER_COMPOSE) $(ARGS)

up:
	$(DOCKER_COMPOSE) stop
	$(DOCKER_COMPOSE) up -d --force-recreate

upl:
	$(DOCKER_COMPOSE) stop
	$(DOCKER_COMPOSE) up -d --force-recreate
	echo ------------------------------------------
	make ips
	make logs

build:
	cat ./docker/environments/$(ARGS)/.dist > .env
	$(DOCKER_COMPOSE) stop
	$(DOCKER_COMPOSE) build --pull
	make up

rebuild:
	$(DOCKER_COMPOSE) stop
	$(DOCKER_COMPOSE) build --no-cache --pull

logs:
	$(DOCKER_COMPOSE) logs --follow

apil:
	$(DOCKER_COMPOSE) logs --follow wishlist_api


apit:
	$(DOCKER_COMPOSE) exec wishlist_api npm test

bash: shell

ips:
	$(DOCKER_COMPOSE) ps --services | awk '{print $$1}' | while read f; do echo "$$f -> "$$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $$f); done

#############################
# Argument fix workaround
#############################
%:
@:
