import { persons, products, purchases } from "./database";
import express, { Request, Response } from 'express'
import { Product, Purchase } from "./types";
import cors from 'cors';


console.log(persons)
console.log(products)
console.log(purchases)

//invocando a função express() dentro da variável app 👇🏽
const app = express();

//configuração do middleware que garante que nossas respostas estejam sempre
//no formato json 👇🏽
app.use(express.json());

//configuração do middleware que habilita o CORS 👇🏽
app.use(cors());

//colocando nosso servidor para escutar a porta 3003 da nossa máquina (primeiro 
//parâmetro da função listen)
//a função de callback (segundo parâmetro da função listen) serve para sabermos 
//que o servidor está de pé, através do console.log que imprimirá a mensagem no 
//terminal 👇🏽

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
});

// config do app express aqui (referencie o material async)

// endpoint GET sem query
// o path é "/pets"


// config do app express aqui (referencie o material async)

// endpoint GET com query q
// o path é "/pets/search"

app.get('/products', (req: Request, res: Response) => {
    res.status(200).send(products)
})

app.get('/products/search', (req: Request, res: Response) => {
    const q = req.query.q as string // forçamos a tipagem aqui*

    const result = products.filter(
        (products) => products.name.toLowerCase().includes(q.toLowerCase())
    )
    res.status(200).send(result)
})

app.post('/products', (req: Request, res: Response) => {
    // forçamos novamente a tipagem
    const id = req.body.id as string
    const name = req.body.name as string
    const price = req.body.price as number
    const category = req.body.category as string

    const newProducts: Product = {
        id,
        name,
        price,
        category,
    }

    products.push(newProducts)

    res.status(201).send("Cadastro realizado com sucesso")
})

app.post('/purchases', (req: Request, res: Response) => {
    // forçamos novamente a tipagem
    const userId = req.body.userId as string
    const productId = req.body.productId as string
    const quantity = req.body.quantity as number
    const totalPrice = req.body.totalPrice as number

    const newPurchases: Purchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }

    purchases.push(newPurchases)

    res.status(201).send("Compra realizado com sucesso")
})

app.get('/purchases', (req: Request, res: Response) => {
    res.status(200).send(purchases)
})