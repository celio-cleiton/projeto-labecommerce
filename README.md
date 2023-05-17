# Projeto LabEcommerce

O Projeto LabEcommerce é o primeiro projeto do curso de back-end, onde praticamos a criação de uma API vinculada a um banco de dados real. O projeto tem a particularidade de ter seus requisitos implementados ao longo dos exercícios pós-aula. Isso significa que, ao acompanhar o desenvolvimento das aulas, você terá um projeto funcional e quase pronto para entrega quando chegar a data de entrega.

## Conteúdos abordados

- NodeJS
- Typescript
- Express
- SQLite
- Knex
- Postman
- Banco de dados

## Requisitos

### Endpoints

- **Get all users**: Retorna todas as pessoas cadastradas.
- **Create user**: Cadastra uma nova pessoa.
- **Create product**: Cadastra um novo produto.
- **Get all products funcionalidade 1**: Retorna todos os produtos cadastrados.
- **Get all products funcionalidade 2**: Retorna os produtos filtrados por nome.
- **Edit product by id**: Edita um produto existente.
- **Create purchase**: Cadastra um novo pedido.
- **Delete purchase by id**: Deleta um pedido existente.
- **Get purchase by id**: Retorna os dados de uma compra, incluindo a lista de produtos.

### Documentação Postman

O arquivo de documentação do Postman deve conter os exemplos de requisição e resposta para cada endpoint.

## Exemplos de requisição

**Get all users**

```http
GET /users
```

```json
[
    {
        "id": "u001",
        "name": "Fulano",
        "email": "fulano@example.com",
        "password": "fulano123",
        "createdAt": "2023-01-15 09:12:42"
    },
    {
        "id": "u002",
        "name": "Ciclana",
        "email": "ciclana@example.com",
        "password": "ciclana99",
        "createdAt": "2023-01-17 12:35:28"
    }
]
```

**Create user**

```http
POST /users
```

```json
{
    "id": "u003",
    "name": "Astrodev",
    "email": "astrodev@example.com",
    "password": "astrodev00"
}
```

**Create product**

```http
POST /products
```

```json
{
    "id": "prod003",
    "name": "Teclado gamer",
    "price": 200,
    "description": "Teclado mecânico com numpad",
    "imageUrl": "https://picsum.photos/seed/Teclado%20gamer/400"
}
```

**Get all products funcionalidade 1**

```http
GET /products
```

```json
[
    {
        "id": "prod001",
        "name": "Mouse gamer",
        "price": 250,
        "description": "Melhor mouse do mercado!",
        "imageUrl": "https://picsum.photos/seed/Mouse%20gamer/400"
    },
    {
        "id": "prod002",
        "name": "Monitor",
        "price": 900,
        "description": "Monitor LED Full HD 24 polegadas",
        "imageUrl": "https://picsum.photos/seed/Monitor/400"
    },
    {
        "id": "prod003",
        "name": "Teclado gamer",
        "price": 200,
        "description": "Teclado mecânico com numpad",
        "imageUrl": "https://picsum.photos/seed/Teclado%20gamer/400"
    }
]
```

**Get all products funcionalidade 2**

```http
GET /products?q=gamer
```

```json
[
    {
        "id": "prod001",
        "name": "Mouse gamer",
        "price": 250,
        "description": "Melhor mouse do mercado!",
        "imageUrl": "https://picsum.photos/seed/Mouse%20gamer/400"
    },
    {
        "id": "prod003",
        "name": "Teclado gamer",
        "price": 200,
        "description": "Teclado mecânico com numpad",
        "imageUrl": "https://picsum.photos/seed/Teclado%20gamer/400"
    }
]
```

**Edit product by id**

```http
PUT /products/prod003
```

```json
{
    "id": "prod0033",
    "name": "Teclado gamer RGB",
    "price": 300,
    "description": "Teclado mecânico com RGB e numpad",
    "imageUrl": "https://picsum.photos/seed/Teclado%20gamer%20RGB/400"
}
```

**Create purchase**

```http
POST /purchases
```

```json
{
    "id": "pur001",
    "buyer": "u001",
    "totalPrice": 1400,
    "products": [
        {
            "id": "prod001",
            "name": "Mouse gamer",
            "price": 250,
            "description": "Melhor mouse do mercado!",
            "imageUrl": "https://picsum.photos/seed/Mouse%20gamer/400",
            "quantity": 2
        },
        {
            "id": "prod002",
            "name": "Monitor",
            "price": 900,
            "description": "Monitor LED Full HD 24 polegadas",
            "imageUrl": "https://picsum.photos/seed/Monitor/400",
            "quantity": 1
        }
    ]
}
```

**Delete purchase by id**

```http
DELETE /purchases/pur002
```

**Get purchase by id**

```http
GET /purchases/pur001
```

```json
{
    "purchaseId": "pur001",
    "buyerId": "u001",
    "buyerName": "Fulano",
    "buyerEmail": "fulano@example.com",
    "totalPrice": 1400,
    "createdAt": "2023-01-15 16:24:54",
    "paid": 0,
    "products": [
        {
            "id": "prod001",
            "name": "Mouse gamer",
            "price": 250,
            "description": "Melhor mouse do mercado!",
            "imageUrl": "https://picsum.photos/seed/Mouse%20gamer/400",
            "quantity": 2
        },
        {
            "id": "prod002",
            "name": "Monitor",
            "price": 900,
            "description": "Monitor LED Full HD 24 polegadas",
            "imageUrl": "https://picsum.photos/seed/Monitor/400",
            "quantity": 1
        }
    ]
}
```

## Como executar o projeto

1. Faça o clone do repositório.
2. Instale as dependências do projeto com o comando `npm install`.
3. Execute o comando `npm run dev` para iniciar o servidor de desenvolvimento.
4. O servidor estará disponível em `http://localhost:3003`.
5. Utilize o Postman ou qualquer outra ferramenta de API para fazer as requisições aos endpoints descritos acima.

## Banco de Dados

O projeto utiliza o banco de dados SQL SQLite. A estrutura do banco de dados pode ser visualizada no seguinte [link](https://dbdiagram.io/d/63c6e8e5296d97641d7a4666).

## Observações

- Ao realizar as requisições, verifique a estrutura dos dados e respeite os nomes das tabelas, colunas e propriedades retornadas pela API.
- Para o endpoint de busca de produtos por nome, utilize o parâmetro de consulta `q` na URL.
- Adicionar colunas extras na tabela não é um problema, mas a falta de uma coluna ou propriedade na resposta será considerada uma falha de implementação.

Não é necessário cadastrar os mesmos nomes, e-mails ou outros valores vistos nos exemplos de saída, mas certifique-se de seguir a estrutura exigida pelo banco de dados e os nomes das propriedades na resposta da API.

Turma: Barbosa C, Noturno.
Aluno: Célio Cleiton Do Vale Rodrigues.