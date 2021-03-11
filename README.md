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

### Testes Postman

<div class="postman-run-button"
data-postman-action="collection/import"
data-postman-var-1="fc73e04a81a9a60d35cc"
data-postman-param="env%5Bdevelopment%5D=W3sia2V5IjoidXJsIiwidmFsdWUiOiJodHRwOi8vbG9jYWxob3N0IiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJ0b2tlbiIsInZhbHVlIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SjFjMlZ5Ym1GdFpTSTZJblJsYzNSbGN5SXNJbWxoZENJNk1UWXhOVFF5T1RjNU55d2laWGh3SWpveE5qRTFORE16TXprM2ZRLlhYazRRSlRJTjdVWjlWSFRPcW1rSFR1V09iU3ZwMUlNajRocUNwSExCQ0EiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6InVzZXIiLCJ2YWx1ZSI6InRlc3RlcyIsImVuYWJsZWQiOnRydWV9LHsia2V5Ijoicm9sZSIsInZhbHVlIjoiQXBwIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJwcm9kdWN0cyIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJwcm9kdWN0IiwidmFsdWUiOiIxYmYwZjM2NS1mYmRkLTRlMjEtOTc4Ni1kYTQ1OWQ3OGRkMWYiLCJlbmFibGVkIjp0cnVlfV0="></div>
<script type="text/javascript">
  (function (p,o,s,t,m,a,n) {
    !p[s] && (p[s] = function () { (p[t] || (p[t] = [])).push(arguments); });
    !o.getElementById(s+t) && o.getElementsByTagName("head")[0].appendChild((
      (n = o.createElement("script")),
      (n.id = s+t), (n.async = 1), (n.src = m), n
    ));
  }(window, document, "_pm", "PostmanRunObject", "https://run.pstmn.io/button.js"));
</script>
