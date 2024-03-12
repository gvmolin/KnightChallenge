# Projeto VueJS 3 + NestJS + MongoDB
# DESAFIO KNIGHTS CHALLENGE

## Visão Geral

Este repositório contém uma aplicação web full-stack construída com VueJS 3 para o frontend, NestJS para o backend e MongoDB como banco de dados. Essa combinação poderosa proporciona uma solução escalável e moderna para o desenvolvimento de aplicações web.

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes itens instalados:

- [Node.js](https://nodejs.org/) (v14 ou superior)
- [Yarn](https://yarnpkg.com/) (v1.22 ou superior)
- [Docker](https://www.docker.com/) (para o MongoDB)

## Configurando o MongoDB com Docker

1. Faça o pull da imagem Docker do MongoDB:

    ```bash
    docker pull mongo
    ```

2. Crie um container Docker para o MongoDB:

    ```bash
    docker run -d -p 27017:27017 --name mongodb-instance mongo
    ```

   Substitua `mongodb-instance` pelo nome desejado para o seu container.

## Começando

1. Clone o repositório:

    ```bash
    git clone https://github.com/gvmolin/KnightChallenge
    ```

2. Acesse o diretório do projeto:

    ```bash
    cd seu-repositorio
    ```

3. Instale as dependências do frontend:

    ```bash
    cd frontend
    yarn install
    ```

4. Instale as dependências do backend:

    ```bash
    cd backend
    yarn install
    ```

## Configuração

1. Configure o ambiente do backend:

   Crie um arquivo `.env` no diretório `backend` e forneça as variáveis de ambiente necessárias. Você pode utilizar o arquivo `.env.example` como um modelo.

2. Atualize a configuração do frontend:

   Ajuste o endpoint da API no arquivo `frontend/src/api/config.js`, se necessário.

## Executando a Aplicação

1. Inicie o servidor backend:

    ```bash
    cd backend
    yarn start:dev
    ```

2. Inicie o servidor de desenvolvimento do frontend:

    ```bash
    cd frontend
    yarn serve
    ```

3. Abra seu navegador e acesse `http://localhost:8080` para utilizar a aplicação.

## Build para Produção

1. Construa o frontend para produção:

    ```bash
    cd frontend
    yarn build
    ```

   Os arquivos prontos para produção estarão no diretório `frontend/dist`.

2. Inicie o servidor backend em modo de produção:

    ```bash
    cd backend
    yarn start:prod
    ```

## Informações Adicionais

- Configure os .env em cada arquivo
- A string de conexão com o MongoDB está especificada no arquivo `.env` do backend.
- Personalize a aplicação de acordo com seus requisitos.

Sinta-se à vontade para contribuir, relatar problemas ou fornecer feedback!

## Lista "To-do"
- Sessão de partida via websockets
- Autenticaçao de usuário
- Deploy
- Visualização no "modo tabela tradicional"
