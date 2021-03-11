# Wishlist

[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)

## 
Baixar projeto: 
``` 
git clone git@github.com:kleberfranco/wishlist.git
```

## configurar e rodar projeto local

### Windows, Mac

+ Para configurar, na pasta raiz, executar os comandos abaixo:
``` 
cat ./docker/environments/dev/.dist > .env
```

+ Para rodar, executar os comandos abaixo:
``` 
docker-compose -f docker-compose.yml build --pull
docker-compose -f docker-compose.yml up -d --force-recreate
```


### Linux

+ Para configurar, na pasta raiz, executar os comandos abaixo:
``` 
make build dev
```

+ Para rodar, executar os comandos abaixo:
``` 
make up
```

### Testes Postman


[![Run in Postman](https://s3.amazonaws.com/postman-static/run-button.png)](https://www.getpostman.com/collections/fc73e04a81a9a60d35cc)