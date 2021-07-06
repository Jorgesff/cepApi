# Api de consulta de CEP

## Setup

1. Faça o download do repositorio.  
`git clone https://github.com/Jorgesff/cepApi.git`

2. Na pasta raiz do projeto instale as dependencias com o comando.  
`npm install`

3. crie o arquivo de env de acordo com o ambiente que sera executado o sistema uma amostra das variaveis esta no arquivo `env-sample` na raiz do projeto
``` 
    .env-development
    .env-production
    .env-stage
```

4. Execute o projeto  
`npm start`

5. Para ver a documentação completa da api pelo swagger basta acessar o seguinte endereço enquanto o serviço estiver ativo

```
    http://<host>:<port>/documentation
```

## Testes

### Comando
`npm test`

