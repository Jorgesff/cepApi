# Api de consulta de CEP

## Arquitetura
  ### Linguagem
  * Noje js
  ### Framework
  * hapi js
  ### Documentation
  * swagger
  ### Test
  * jest 
  ### Http request lib
  * axios
  ### Utils
  * lodash

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

## Resposta da questão 2

Apos digitar o endereço da pagina iniciar a busca do site, o navegador irá tentar buscar os aquivos disponibilizados pelo servidor correspondente do site, para isso ele passa por alguns caminhos.  
  
  1. O navegador envia uma requisição HTTP para os servidores de DNS cujo qual esta resgistrado os IPs correspondentes a cada dominio ele faz isso destrinchando o DNS e acessando cada servidor de namespace (.com é um exemplo de namespace) ate encontrar o registro feito pelo dono do site  
  <b>exemplo:</b>  
```
www.netshoes.com.br  
servidor .br -> .com -> netshoes  
```
 2. Após encontrar o IP do servidor o mesmo verifica se aprova ou não a requisição recebida, caso aprove ele junta os aquivos necessarios para a exibição dos dados em blocos de bytes e envia para o navegador seguindo o protocolo de tcp/ip.

 3. O navegador recebendo uma resposta positiva do servidor ele começa a montar os arquivos e interpretar e montar os arquivos HTML e javascript para poder exibir para o usuario.
