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

#### Funcionalidades para Produto:

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

:heavy_check_mark:Retorno de um produto através de um mapper

:heavy_minus_sign: Request - GET - `http://localhost:3000/api/v1/product/marketplace`

#### Funcionalidades de Usuário:

:heavy_check_mark:Listar todos os usuários.

:heavy_minus_sign:  Request - GET -`http://localhost:3000/api/v1/user`

:heavy_check_mark:Criação de um novo usuário.

:heavy_minus_sign:  Request - POST -`http://localhost:3000/api/v1/user`

:heavy_check_mark:Login de usuário.

:heavy_minus_sign:  Request - POST -`http://localhost:3000/api/v1/User/authenticate`

## Pré-requisitos/Dependências:books:

:green_book: Cors

:green_book: Dotenv

:green_book: Eslint

:green_book: Express

:green_book: Faker

:green_book: Jest

:green_book: Joi

:green_book: MongoDb

:green_book: Mongoose

:green_book: Mongoose-paginate-v2

:green_book: Multer

:green_book: Nodejs

:green_book: Nodemon

:green_book: Prettier

:green_book: SuperTest

:green_book: Typescript

## Como rodar a aplicação::arrow_forward:

:one: Clone o repositório no github: `https://github.com/fabiotbraga/Desafio-CompassMart.git`.

:two: Instale as dependências: `npm install`.

:three: Crie um arquivo *.env* baseado no arquivo *.env.example.* contido no repositório. O arquivo deve conter as informações do seu banco de dados mongoDb. Caso não possua cria um em: https://www.mongodb.com/pt-br

:four: Rode o código no terminal: `npm run dev`.

## Como rodar os testes::hammer_and_wrench:

:one: Crie um arquivo *.env*.test baseado no arquivo *.env.example.* contido no repositório. O arquivo deve conter as informações do seu banco de dados mongoDb. Caso não possua cria um em: https://www.mongodb.com/pt-br. Esse banco deve ser diferente do que está a aplicação e deve ser usado para os testes.

:four: Rode o código no terminal: `npm run test`.

## Swagger e Documentação: :book:

:pen: Documentação Swagger disponível em rota e pode ser aberta no navegador com o seguinte entereço:

:pen: `http://localhost:3000/api/v1/api-docs`

### Deploy no Heroku:

- https://compassmartdeploy.herokuapp.com/

# Developer::man_technologist:

| [<img src="https://avatars.githubusercontent.com/u/86860928?s=400&u=3a60af35e718b5627adfb0b572e2d40a813275e9&v=4" width=115 > <br> <sub> Fábio Teixeira </sub>](https://github.com/fabiotbraga) |
| :----------------------------------------------------------- |



