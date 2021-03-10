# Wishlist

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

