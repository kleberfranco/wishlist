# Wishlist

[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)

## Pré-requisitos
+ [Git](https://git-scm.com/)
+ [Docker](https://www.docker.com/)
+ [Docker-Compose](https://docs.docker.com/compose/)

Baixar projeto: 
``` 
git clone git@github.com:kleberfranco/wishlist.git
```

## Configurar e rodar projeto local

### Windows

+ Para configurar, na pasta raiz do projeto, executar os comandos abaixo:
``` 
cat ./docker/environments/dev/.dist > .env
```

+ Para rodar, executar os comandos abaixo:
``` 
docker-compose -f docker-compose.yml build --pull
docker-compose -f docker-compose.yml up -d --force-recreate
```


### Linux, Mac

+ Para configurar, na pasta raiz do projeto, executar os comandos abaixo:
``` 
make build dev
```

+ Para rodar, executar os comandos abaixo:
``` 
make up
```

## Documentação da API
Para visualizar a documentação, [clique aqui](https://documenter.getpostman.com/view/2255152/Tz5qZwXG)

## Testes Postman
Para usar a última versão publicada, clique no botão a seguir para importar a coleção da API Wishlist:

[![Run in Postman](https://s3.amazonaws.com/postman-static/run-button.png)](https://www.getpostman.com/collections/fc73e04a81a9a60d35cc)

Você também pode baixar o arquivo de coleção deste repositório e, em seguida, importar diretamente para o Postman.

### Pré-requisitos
- *Postman* A coleção deve ser usada pelo aplicativo Postman. Postman é um utilitário que permite testar e usar APIs REST rapidamente. Mais informações podem ser encontradas em [getpostman.com](https://www.getpostman.com/).

### Uso

A coleção é organizada em pastas de acordo com os domínios dos endpoints da API.

Somente as requisições para `/auth/token` não exigem um token API válido. As demais solicitações têm uma variável de ambiente chamada `token` para isso.
Isso deve ser definido em seu [Postman environment](https://learning.postman.com/docs/sending-requests/managing-environments/).


Mais informações sobre como gerenciar ambientes e variáveis Postman podem ser encontradas [aqui](https://learning.postman.com/docs/sending-requests/variables/).

|Variáveis  | Exemplo | Descrição|
|----------|----------------------------|-------|
|`url` |`http://localhost`              |Url da api|
|`token`|- |Token gerado a partir do endpoint `/auth/token`|
|`user`|- | Usuário utilizado para gerar o token|
|`role`|- | Perfil do usuário utilizado para gerar o token|
|`url_products`|`http://challenge-api.luizalabs.com/api/product`| Endpoint com a lista de produtos |
|`page_products`|`1`|Número da página de produtos|
|`total_selected_products`|`10`|Número de produtos selecionados automaticamente, após utilizar o método `{{url_products}}/?page={{page_products}}` |
|`product`|-| Registra o último produto da lista, após utilizar o método `{{url_products}}/?page={{page_products}}`  . |
|`products`|`[]`|Produtos selecionados automaticamente de acordo com a `total_selected_products`|
|`customer_id`|-|Identificador do Cadastro do cliente|
|`wishlist_id`|-|Identificador do Cadastro da Lista de produtos favoritos|


### Contribute

We welcome your contributions!  See [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to help out.

### Change Log

[Log de alterações](CHANGELOG.md)

## Veja também

[API documentation](https://documenter.getpostman.com/view/2255152/Tz5qZwXG)

[Postman API development tool](https://www.getpostman.com/)

