[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=AmaralMarti_f1-help&metric=alert_status)](https://sonarcloud.io/dashboard?id=AmaralMarti_f1-help)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=AmaralMarti_f1-help&metric=code_smells)](https://sonarcloud.io/dashboard?id=AmaralMarti_f1-help)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=AmaralMarti_f1-help&metric=bugs)](https://sonarcloud.io/dashboard?id=AmaralMarti_f1-help)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=AmaralMarti_f1-help&metric=security_rating)](https://sonarcloud.io/dashboard?id=AmaralMarti_f1-help)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=AmaralMarti_f1-help&metric=sqale_index)](https://sonarcloud.io/dashboard?id=AmaralMarti_f1-help)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=AmaralMarti_f1-help&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=AmaralMarti_f1-help)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=AmaralMarti_f1-help&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=AmaralMarti_f1-help)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=AmaralMarti_f1-help&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=AmaralMarti_f1-help)


# F1 Help - Fórum de Perguntas

_**Atenção:** Essa é uma prova de conceito, portanto **não tem objetivo de ser um sistema pronto para ser colocado em produção**. Algumas validações de consistência não foram implementadas e alguns recursos forma implementados de maneira simplificada._

O F1 Help é um sistema de forum onde dúvidas são postadas e podem ser respondidas por outras pessoas, além disso é possível pesquisar as dúvidas postadas, além de poder votar com **positivo** ou **netativo** nas perguntas e nas respostas, o que pode indicar sua relevância para os demais usuários.

![Tela principal do F1](http://marti.com.br/imagens/F1-tela-01.png)
_Coloquei essa imagem aqui porque não gosto de entrar no repositório e não saber a cara que o sistema tem._

## Requisitos
​
### Para desenvolvimento: 
Se quiser usar em ambiente de desenvolvimento será necessário:

- Git
- Docker (Ver. 19)
- Docker Compose (Ver.1.21)- 
- NodeJS LTS (Ver. 12)
- React (Ver. 16)

### Para execução apenas

- Git
- Docker (Ver. 19)
- Docker Compose (Ver.1.21)

## Como executar o sistema

O sistema tem uma **API Rest** no back-end, a qual usa um banco de dados **MariaDB**, e um **front-end** em **React**. Ele está preparado para funcionar através do **Docker**, portanto a forma de executá-lo é bem simples:

#### 1 - Clone o repositório para sua máquina
```
$ git clone https://github.com/AmaralMarti/f1-help.git
```

#### 2 - Entre no diretório do projeto e suba o Docker Compose
```
$ cd f1-help
$ docker-compose up -d
```
_**Importante:** na primeira vez que você subir o Docker Compose acontecerá o **pull** e o **build** das imagens Docker utilizadas, o que pode demorar alguns minutos dependendo da sua internet e dos recursos do seu computador._

#### 3 - Verifique os containers em execução
```
$ docker ps

CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
4b7258564b32        f1-help_frontend    "docker-entrypoint.s…"   2 minutes ago       Up 2 minutes        0.0.0.0:3000->5000/tcp   f1-help-frontend
5678aac1be6a        f1-help_backend     "docker-entrypoint.s…"   2 minutes ago       Up 2 minutes        0.0.0.0:4000->4000/tcp   f1-help-backend
70cbed2e2e85        mariadb             "docker-entrypoint.s…"   2 minutes ago       Up 2 minutes        0.0.0.0:3306->3306/tcp   f1-help-database
```
_**Importante:** veja que há 3 containeres rodando, sendo um para **banco de dados**, um para o **backe-end(API)** e um para o **front-end**._

### 4 - Acessar a página da aplicação

Abra seu navegador e acesse o endereço:
```
http://127.0.0.1:3000
```
## Como rodar em ambiente de desenvolvimento

No ambiente de desenvolvimento você poderá acessar o código-fonte, fazer alterações e vê-las funcionando (ou não, caso gere algum erro kkk)

#### 1 - Clone o repositório para sua máquina
```
$ git clone https://github.com/AmaralMarti/f1-help.git
```
#### 2 - Entre no diretório do projeto
```
$ cd f1-help
```

#### 3 - Altere o arquivo docker-compose.yml
```
$ mv docker-compose.yml docker-compose-prod.yml
$ mv docker-compose-dev.yml docker-compose.yml
```

#### 4 - Inicie o banco de dados no Docker
```
$ docker-compose up -d
```
_**Importante:** isso fará que apenas o container com o banco de dados da aplicação fique rodando na porta 3306 (porta padrão do MariaDB) na sua máquina local_

### Back-end 

#### 1 - Entre no diretório do back-end e instale as dependências
```
$ cd back-end
$ npm install
```
#### 2 - Rode seu ambiente de desenvolvimento
```
$ npm run dev
```
#### 3 - Abra seu editor de código e fiquei a vontade!

Se estiver usando o VS Code pode usar o comando abaixo:
```
$ code .
```

#### 4 - [Opcional] Rodando os testes do projeto

É sempre importante programar com testes, esse projeto tem suites de testes de integração e você pode querer rodá-lo para verificar se está tudo em ordem. Caso queira (e eu recomendo que queira!) use o comando:
```
$ npm test
```
Rodando os testes sem ter feito nenhuma alteração você deve receber um resultado igual a esse:

![print do resultado dos testes](http://marti.com.br/imagens/F1-Testes.png)

_**Importante:** Se você reparar, faltou apenas um brach de uma única linha de do arquivo de configuração do projeto, se não fosse ela a cobertura seria **100% cravado**!_

### Front-end 

#### 1 - Entre no diretório do front-end e instale as dependências
```
$ cd front-end
$ npm install
```
#### 2 - Rode seu ambiente de desenvolvimento
```
$ npm start
```
#### 3 - Abra seu editor de código e fiquei a vontade!

Se estiver usando o VS Code pode usar o comando abaixo:
```
$ code .
```

# Documentação da API

## Endpoints para _Questions_ 

### 1 - Retorna a lista de perguntas cadastradas

**1.1 - Endpoint:** /v1/questions

**1.2 - Método:** GET

**1.3 - Query parameters aceitos:**

**A - Filtros** 

Filtra as perguntas e retorna apenas aquelas que atendam ao critério definido, **maiúsculas ou minúsculas não interferem no resultado**.

É possível filtrar por: 
 - **[user]** Nome de usuário
 - **[title]** Título da pergunta
 - **[text]** Texto da pergunta
 
Veja os detalhes abaixo:
```
Usuário:
user=Henrique%  // Filtra perguntas cujo nome do usuário comece com "Henrique"
user=%Marti     // Filtra perguntas cujo nome do usuário termine com "Marti"
user=%Amaral%   // Filtra perguntas cujo nome do usuário tenha "Amaral" em qualquer parte

Title:
title=docker%   // Filtra perguntas onde o titulo comece com "docker"
title=%docker   // Filtra perguntas onde o título termine com "docker"
title=%docker%  // Filtra perguntas onde o título tenha "docker" em qualquer parte

Text:
text=linux%     // Filtra perguntas em que o texto comece com "linux"
text=%linux     // Filtra perguntas em que o texto termine com "linux"
text=%linux%    // Filtra perguntas em que o texto tenha "linux" em qualquer parte
```
_**Exemplo de uso dos filtros:**_
```
 /v1/questions?user=Henrique%&title=%docker%
 ```

**B - Ordenação**

Permite ordenar a lista de perguntas por um campos específico, ondicando se a ordenção vai ser **_ascendente_** ou **_descendente_**

É possível ordenar por:
  - **[user]** Nome de usuário
  - **[title]** Título da pergunta
  - **[text]** Texto da pergunta
  - **[views]** Número de visualizações da pergunta
  - **[likes]** Número de curtidas da pergunta
  - **[answers]** Quantidade de respostas da pergunta

Veja os detalhes abaixo:
```
order=user   // ordenação ASCENDENTE pelo nome do usuário

order=-user  // ordenação DESCENDENTE pelo nome do usuário
             // ** Repare no hífen (-) na frente de "user"
```

_**Exemplo de uso da ordenação:**_
```
 /v1/questions?order=answers
 ```

**C - Paginação**
É possível dividir o resultado da consulta em páginas, indicando quantas perguntas por página você prefere e qual página você deseja que seja retornada.

_**Importante**: caso não sejam indicados parâmetros de paginação os parâmetros padrão serão usandos, esses são:_
  - _Primeira página_
  - _5 perguntas por página_

Veja os detalhes abaixo:
```
page=1&perpage=10   // Primeira página e 10 perguntas por página
page=3&perpage=15   // Terceira página e 15 perguntas por página
```

_**Exemplo de uso da paginação:**_
```
 /v1/questions?page=1&=perpage=50
 ```



**1.4 - Resposta:**
```
StatusCode: 200

{
  "metadata":  {
    "pageCount":  Number,         // Quantidade total de páginas para a paginação atual
    "page":  Number,              // Número da página retornada
    "perPage":  Number,           // Número de perguntas por página
    "rowCount":  Number           // Número de perguntas presentes na página retornada
  },
  "data": [
    {
      "id": Number,               // ID da pergunta
      "user": String,             // Nome do usuário que fez a pergunta
      "title": String,            // Título da pergunta
      "text": String,             // Texto da pergunta
      "answerCount": Number,      // Quantidade de respostas que a pergunta tem
      "views": Number,            // Quantidade de visualizações da pergunta
      "likes": Number,            // Quantidade de curtidas que a pergunta tem
      "createdAt": Date Time,     // Data e hora do cadastro da pergunta
      "updatedAt": Date Time,     // Data e hora da última alteração da pergunta
      "answers": [                // Lista de respostas da pergunta
        {
          "id": Number,           // ID da resposta
          "user": String,         // Nome do usuário que respondeu
          "text": String,         // Texto da resposta
          "likes": Number,        // Quantidade de curtidas da resposta
          "createdAt": Date Time, // Data e hora do cadastro da resposta
          "updatedAt": Date Time, // Data e hota da última alteração da resposta
        }
      ]
    }
  ]
}
```

### 2 - Retorna uma pergunta especificamente

**2.1 - Endpoint:** /v1/questions/**_:questionId_**

_**:questionId** deve ser preenchido com o ID da pergunta desejada_

**2.2 - Método:** GET

**2.3 - Resposta:**

```
StatusCode: 200

{
  "id": Number,               // ID da pergunta
  "user": String,             // Nome do usuário que fez a pergunta
  "title": String,            // Título da pergunta
  "text": String,             // Texto da pergunta
  "answerCount": Number,      // Quantidade de respostas que a pergunta tem
  "views": Number,            // Quantidade de visualizações da pergunta
  "likes": Number,            // Quantidade de curtidas que a pergunta tem
  "createdAt": Date Time,     // Data e hora do cadastro da pergunta
  "updatedAt": Date Time,     // Data e hora da última alteração da pergunta
  "answers": [                // Lista de respostas da pergunta
     ...
  ]
}
```

### 3 - Cadastrar uma nova pergunta

**3.1 - Endpoint:**/v1/questions

**3.2 - Método:** POST

**3.3 - Corpo aceito:**
```
{
  "user": String,  // Nome do usuário
  "title": String, // Título da pergunta
  "text": String   // Texto da pergunta
}
```

**3.4 - Resposta:**
```
StatusCode: 201

{
  "id": Number,               // ID da pergunta
  "user": String,             // Nome do usuário que fez a pergunta
  "title": String,            // Título da pergunta
  "text": String,             // Texto da pergunta
  "answerCount": Number,      // Quantidade de respostas que a pergunta tem
  "views": Number,            // Quantidade de visualizações da pergunta
  "likes": Number,            // Quantidade de curtidas que a pergunta tem
  "createdAt": Date Time,     // Data e hora do cadastro da pergunta
  "updatedAt": Date Time,     // Data e hora da última alteração da pergunta
  "answers": [                // Lista de respostas da pergunta
     ...
  ]
}
```

### 4 - Alterar uma pergunta (total ou parcialmente)

**4.1 - Endpoint:** /v1/questions/**_:questionId_**

_**:questionId** deve ser preenchido com o ID da pergunta desejada_

**4.2 - Método:** PATCH

**4.3 - Corpo aceito:**
```
{
  "user": String,  // Nome do usuário
  "title": String, // Título da pergunta
  "text": String   // Texto da pergunta
}
```
**4.4 - Resposta:**

```
StatusCode: 200

{
  "id": Number,               // ID da pergunta
  "user": String,             // Nome do usuário que fez a pergunta
  "title": String,            // Título da pergunta
  "text": String,             // Texto da pergunta
  "answerCount": Number,      // Quantidade de respostas que a pergunta tem
  "views": Number,            // Quantidade de visualizações da pergunta
  "likes": Number,            // Quantidade de curtidas que a pergunta tem
  "createdAt": Date Time,     // Data e hora do cadastro da pergunta
  "updatedAt": Date Time,     // Data e hora da última alteração da pergunta
  "answers": [                // Lista de respostas da pergunta
     ...
  ]
}
```

### 5 - Apagar uma pergunta

**5.1 - Endpoint:** /v1/questions/**_:questionId_**

_**:questionId** deve ser preenchido com o ID da pergunta desejada_

**5.2 - Método:** DELETE

**5.3 - Resposta:**

```
StatusCode: 204

Esse endpoint não devolve corpo de retorno
```

### 6 - Incrementar em 1 o View de uma pergunta

**6.1 - Endpoint:** /v1/questions/:questionId/view

_**questionId** deve ser preenchudi com o ID da pergunta desejada_

**6.2 - Método:** POST

**6.3 - Corpo aceito:**
```
Esse endpoint não precisa de envio de corpo
```
**6.4 - Resposta:**

```
StatusCode: 200

{
  "id": Number,               // ID da pergunta
  "user": String,             // Nome do usuário que fez a pergunta
  "title": String,            // Título da pergunta
  "text": String,             // Texto da pergunta
  "answerCount": Number,      // Quantidade de respostas que a pergunta tem
  "views": Number,            // Quantidade de visualizações da pergunta
  "likes": Number,            // Quantidade de curtidas que a pergunta tem
  "createdAt": Date Time,     // Data e hora do cadastro da pergunta
  "updatedAt": Date Time,     // Data e hora da última alteração da pergunta
  "answers": [                // Lista de respostas da pergunta
     ...
  ]
}
```

### 7 - Incrementar em 1 o Like de uma pergunta

**7.1 - Endpoint:** /v1/questions/**_:questionId_**/like

_**:questionId** deve ser preenchido com o ID da pergunta desejada_

**7.2 - Método:** POST

**7.3 - Corpo aceito:**
```
Esse endpoint não precisa de envio de corpo
```
**7.4 - Resposta:**

```
StatusCode: 200

{
  "id": Number,               // ID da pergunta
  "user": String,             // Nome do usuário que fez a pergunta
  "title": String,            // Título da pergunta
  "text": String,             // Texto da pergunta
  "answerCount": Number,      // Quantidade de respostas que a pergunta tem
  "views": Number,            // Quantidade de visualizações da pergunta
  "likes": Number,            // Quantidade de curtidas que a pergunta tem
  "createdAt": Date Time,     // Data e hora do cadastro da pergunta
  "updatedAt": Date Time,     // Data e hora da última alteração da pergunta
  "answers": [                // Lista de respostas da pergunta
     ...
  ]
}
```

### 8 - Reduzir em 1 o Like de uma pergunta

**8.1 - Endpoint:** /v1/questions/**_:questionId_**/dislike

_**:questionId** deve ser preenchido com o ID da pergunta desejada_

**8.2 - Método:** POST

**8.3 - Corpo aceito:**
```
Esse endpoint não precisa de envio de corpo
```
**8.4 - Resposta:**

```
StatusCode: 200

{
  "id": Number,               // ID da pergunta
  "user": String,             // Nome do usuário que fez a pergunta
  "title": String,            // Título da pergunta
  "text": String,             // Texto da pergunta
  "answerCount": Number,      // Quantidade de respostas que a pergunta tem
  "views": Number,            // Quantidade de visualizações da pergunta
  "likes": Number,            // Quantidade de curtidas que a pergunta tem
  "createdAt": Date Time,     // Data e hora do cadastro da pergunta
  "updatedAt": Date Time,     // Data e hora da última alteração da pergunta
  "answers": [                // Lista de respostas da pergunta
     ...
  ]
}
```

## Endpoints para _Answers_ 

### 1 - Retorna a lista de respostas cadastradas para uma pergunta

**1.1 - Endpoint:** /v1/questions/**_:questionId_**/answers

_**:questionId** deve ser preenchido com o ID da pergunta desejada_

**1.2 - Método:** GET

**1.3 - Query parameters aceitos:**

**_Não há suporte para query parameters_**
Diferente do endpoint que retorna a lista de perguntas cadastradas (_[GET]/v1/questions_) nesse endpoint não fiz a implementação do suporte aos parâmetros. Para o uso que eu fiz não tive necessidade de implementá-los, caso você tenha uma necessidade diferente é possível dar uma olhada em como está o código no outro endpoint e implementar nesse. O processo é bem simples, daria até para criar um _middleware_ para ser usado nos 2 endpoints e seria simples de fazer.

**1.4 - Resposta:**
```
StatusCode: 200

{
  "count": Number,            // Quantidade de respostas retornadas
  "data": [
    {
      "id": Number,           // ID da resposta
	  "user": String,         // Nome do usuário que respondeu
	  "text": String,         // Texto da resposta
	  "likes": Number,        // Quantidade de curtidas da resposta
	  "createdAt": Date Time, // Data e hora do cadastro da resposta
	  "updatedAt": Date Time, // Data e hota da última alteração da resposta
    }
  ]
}
```

### 2 - Retorna uma resposta especificamente

**2.1 - Endpoint:** /v1/questions/**_:questionId_**/answers/**_:answerId_**

_**:questionId** deve ser preenchido com o ID da pergunta desejada_

_**:answerId** deve ser preenchido com o ID da resposta desejada_

**2.2 - Método:** GET

**2.3 - Resposta:**

```
StatusCode: 200

{
  "id": Number,           // ID da resposta
  "user": String,         // Nome do usuário que respondeu
  "text": String,         // Texto da resposta
  "likes": Number,        // Quantidade de curtidas da resposta
  "createdAt": Date Time, // Data e hora do cadastro da resposta
  "updatedAt": Date Time, // Data e hota da última alteração da resposta
}
```

### 3 - Cadastrar uma nova resposta

**3.1 - Endpoint:**/v1/questions/**_:questionId_**/answers

_**:questionId** deve ser preenchido com o ID da pergunta desejada_

**3.2 - Método:** POST

**3.3 - Corpo aceito:**
```
{
  "user": String,  // Nome do usuário
  "text": String   // Texto da resposta
}
```

**3.4 - Resposta:**
```
StatusCode: 201

{
  "id": Number,           // ID da resposta
  "user": String,         // Nome do usuário que respondeu
  "text": String,         // Texto da resposta
  "likes": Number,        // Quantidade de curtidas da resposta
  "createdAt": Date Time, // Data e hora do cadastro da resposta
  "updatedAt": Date Time, // Data e hota da última alteração da resposta
}
```

### 4 - Alterar uma resposta (total ou parcialmente)

**4.1 - Endpoint:** /v1/questions/**_:questionId_**/answers/**_:answerId_**

_**:questionId** deve ser preenchido com o ID da pergunta desejada_

_**:answerId** deve ser preenchido com o ID da resposta desejada_

**4.2 - Método:** PATCH

**4.3 - Corpo aceito:**
```
{
  "user": String,  // Nome do usuário
  "text": String   // Texto da resposta
}
```
**4.4 - Resposta:**

```
StatusCode: 200

{
  "id": Number,           // ID da resposta
  "user": String,         // Nome do usuário que respondeu
  "text": String,         // Texto da resposta
  "likes": Number,        // Quantidade de curtidas da resposta
  "createdAt": Date Time, // Data e hora do cadastro da resposta
  "updatedAt": Date Time, // Data e hota da última alteração da resposta
}
```

### 5 - Apagar uma resposta

**5.1 - Endpoint:** /v1/questions/**_:questionId_**/answers/**_:answerId_**

_**:questionId** deve ser preenchido com o ID da pergunta desejada_

_**:answerId** deve ser preenchido com o ID da resposta desejada_

**5.2 - Método:** DELETE

**5.3 - Resposta:**

```
StatusCode: 204

Esse endpoint não devolve corpo de retorno
```

### 6 - Incrementar em 1 o Like de uma resposta

**6.1 - Endpoint:** /v1/questions/**_:questionId_**/answers/**_:answerId_**/like

_**:questionId** deve ser preenchido com o ID da pergunta desejada_

_**:answerId** deve ser preenchido com o ID da resposta desejada_

**6.2 - Método:** POST

**6.3 - Corpo aceito:**
```
Esse endpoint não precisa de envio de corpo
```
**6.4 - Resposta:**

```
StatusCode: 200

{
  "id": Number,           // ID da resposta
  "user": String,         // Nome do usuário que respondeu
  "text": String,         // Texto da resposta
  "likes": Number,        // Quantidade de curtidas da resposta
  "createdAt": Date Time, // Data e hora do cadastro da resposta
  "updatedAt": Date Time, // Data e hota da última alteração da resposta
}
```

### 7 - Reduzir em 1 o Like de uma resposta

**7.1 - Endpoint:** /v1/questions/**_:questionId_**/answers/**_:answerId_**/dislike

_**:questionId** deve ser preenchido com o ID da pergunta desejada_

_**:answerId** deve ser preenchido com o ID da resposta desejada_

**7.2 - Método:** POST

**7.3 - Corpo aceito:**
```
Esse endpoint não precisa de envio de corpo
```
**7.4 - Resposta:**

```
StatusCode: 200

{
  "id": Number,           // ID da resposta
  "user": String,         // Nome do usuário que respondeu
  "text": String,         // Texto da resposta
  "likes": Number,        // Quantidade de curtidas da resposta
  "createdAt": Date Time, // Data e hora do cadastro da resposta
  "updatedAt": Date Time, // Data e hota da última alteração da resposta
}
```
