# Desafio-CompassMart :department_store:
Repositório criado para o Desafio Técnico Final - Compass UolCompassStore-Challenge.

> Status do Projeto: Em desenvolvimento :gear:

## Tópicos::writing_hand:

:small_blue_diamond: [Descrição do projeto](#descrição-do-projeto)

:small_blue_diamond: [Funcionalidades](#funcionalidades)

:small_blue_diamond: [Pré-requisitos/Dependências](#pré-requisitos/Dependências)

:small_blue_diamond: [Como rodar a aplicação](#como-rodar-a-aplicação)

:small_blue_diamond: [Swagger e Documentação](#swagger-e-documentação)

:small_blue_diamond: [Developer](#Developer)



## Descrição do projeto::memo:

Projeto desenvolvido para o programa de bolsas Compass Uol. O projeto tem a seguinte descrição:

*"A compasso entrou em um novo ramo de mercado, a CompassMart a qual é uma loja de departamento, onde seu foco é a comercialização de alimentos. Para essa API vai ser necessário desenvolver algumas rotas."*

## Funcionalidades::wrench:

:heavy_check_mark:Criação de um novo produto.

​	 :heavy_minus_sign:  Request - POST -`http://localhost:3000/api/v1/product`

:heavy_check_mark:Listar todos os produtos cadastrados.

​	:heavy_minus_sign: Request - GET - `http://localhost:3000/api/v1/product`

:heavy_check_mark:Buscar por X produto cadastrado.

​	:heavy_minus_sign: Request - GET - `http://localhost:3000/api/v1/product/:id`

:heavy_check_mark:Atualizar X produto cadastrado.

​	:heavy_minus_sign: Request - PUT - `http://localhost:3000/api/v1/product/:id`

:heavy_check_mark:Atualizar X produto cadastrado.

​	:heavy_minus_sign: Request - PATCH - `http://localhost:3000/api/v1/product/:id`

:heavy_check_mark:Deletar X produto cadastrado.

​	:heavy_minus_sign: Request - DELETE - `http://localhost:3000/api/v1/product/:id`

:heavy_check_mark:Deve ser possível listar todos os produtos que estão com o estoque baixo.

​	:heavy_minus_sign: Request - GET - `http://localhost:3000/api/v1/product/low_stock`

:heavy_check_mark:Criação de novos produtos através de um CSV

​	:heavy_minus_sign: Request - POST - `http://localhost:3000/api/v1/product/csv`

## Pré-requisitos/Dependências:books:

:green_book: cors

:green_book: dotenv

:green_book: :eslint

:green_book: express

:green_book: joi

:green_book: MongoDb

:green_book: mongoose

:green_book: mongoose-paginate-v2

:green_book: multer

:green_book: Nodejs

:green_book: nodemon

:green_book: Prettier

:green_book: typescript

## Como rodar a aplicação::arrow_forward:

:one: Clone o repositório no github: `https://github.com/fabiotbraga/Desafio-CompassMart.git`.

:two: Instale as dependências: `npm install`.

:three: Crie um arquivo *.env* baseado no arquivo *.env.example.* contido no repositório. O arquivo deve conter as informações do seu banco de dados mongoDb. Caso não possua cria um em: https://www.mongodb.com/pt-br

:four: Rode o código no terminal: `npm run dev`.

## Como rodar os testes::hammer_and_wrench:

:warning: Testes estão em fase de desenvolvimento.

## Swagger e Documentação: :book:

:pen: Documentação Swagger disponível em: https://app.swaggerhub.com/apis-docs/FABIOTBRAGA_1/compass-mart_api/0.0.1

# Developer::man_technologist:

| [<img src="https://avatars.githubusercontent.com/u/86860928?s=400&u=3a60af35e718b5627adfb0b572e2d40a813275e9&v=4" width=115 > <br> <sub> Fábio Teixeira </sub>](https://github.com/fabiotbraga) |
| :----------------------------------------------------------- |



