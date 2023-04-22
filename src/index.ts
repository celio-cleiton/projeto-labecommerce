import { users, products, purchases } from "./database";
import express, { Request, Response } from 'express'
import { Product, Purchase } from "./types";
import { db } from './database/knex';
import cors from 'cors';


console.log(users)
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
// app.get('/users', (req: Request, res: Response) => {
//     res.status(200).send(users)
// })

app.get('/users', async (req: Request, res: Response) => {
  try {
      const result = await db.raw('SELECT * FROM users;')
      res.status(200).send(result)
  } catch (error: any) {
      res.status(400).send(error.message)
  }
})


// endpoint do tipo POST
app.post('/users', async (req: Request, res: Response) => {
  try {
      const id: string = Math.floor(Date.now() * Math.random()).toString(36)
      const {name, email, password } = req.body
      if (typeof name !== "string" || typeof email !== "string") {
          return res.status(400).send("'nome'e 'email' deve ser tipo string")
      }
      const [invalidUser] = await db.raw(`SELECT * FROM users WHERE id = "${id}";`)
      if (invalidUser) {
          res.status(400)
          throw new Error("Este ID já esta cadastrado")
      }
      const [invalidEmail] = await db.raw(`SELECT * FROM users WHERE email = "${email}";`)
      if (invalidEmail) {
          res.status(400)
          throw new Error("Este email já esta cadastrado")
      }
      const newEntry = await db.raw(`INSERT INTO users (id, name, email, password) VALUES ("${id}", "${name}","${email}", "${password}")`) 
      res.status(201).send("Cadastro realizado com sucesso")
  } catch (error: any) {
      res.send(error.message)
  }
});

app.get('/users/:id', (req: Request, res: Response) => {
    try {
      const id = req.params.id
      if (!id) {
        res.status(400).send("Informe o id")
        return
      }
      const user = users.find((user) => user.id === id)
      if (!user) {
        res.status(404).send("Usuário não encontrado")
        return
      }
      res.status(200).send(user)
    } catch (error) {
      res.status(500).send("Erro ao buscar usuário")
    }
  })
  

  app.delete('/users/:id', (req: Request, res: Response) => {
    try {
      const id = req.params.id
      if (!id) {
        res.status(400).send("Informe o id")
        return
      }
      const userIndex = users.findIndex((user) => user.id === id)

      if (userIndex === -1) {
        res.status(404).send("Usuário não encontrado")
        return
      }
      const deletedUser = users.splice(userIndex, 1)
      res.status(200).send(deletedUser)
    } catch (error) {
      res.status(500).send("Erro ao buscar usuário")
    }
  })
  
  app.put('/users/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const email = req.body.email as string | undefined;
        const password = req.body.password as string | undefined;
        // Verifica se o id foi informado
        if (!id) {
            res.status(400).send("Informe o id do usuário");
            return;
        }
        // Busca o usuário pelo id
        const user = users.find((user) => user.id === id);
        // Verifica se o usuário foi encontrado
        if (!user) {
            res.status(404).send("Usuário não encontrado");
            return;
        }
        // Atualiza os dados do usuário
        if (email ) {
            user.email = email;
        }
        if (password) {
            user.password = password;
        }
        res.status(200).send("Cadastro atualizado com sucesso");

    } catch (error) {
        res.status(500).send("Erro ao atualizar cadastro");
    }
});

//fim do Users


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

//endpoint do tipo POST
app.post('/products', async (req: Request, res: Response) => {
  try {
      const id: string = Math.floor(Date.now() * Math.random()).toString(36)        
      const { name, price, description, imageUrl } = req.body
      if (typeof name !== "string" || typeof price !== "number" || typeof description !== "string" ||typeof imageUrl !== "string" ) {
          res.status(400)
          throw new Error("'id','nome'e 'description' deve ser tipo string e price do tipo number");
      }
      const [invalidProductId] = await db.raw(`SELECT * FROM products WHERE id = "${id}";`)
      if (invalidProductId) {
          res.status(400)
          throw new Error("Este ID já possui um produto")
      }
      const newEntry = await db.raw(`INSERT INTO products (id, name, price, description, image_url) VALUES ("${id}", "${name}","${price}", "${description}", "${imageUrl}")`) 
      res.status(201).send("Produto cadastrado com sucesso")
  } catch (error: any) {
      res.send(error.message)
  }

});
// app.post('/products', (req: Request, res: Response) => {
//     // forçamos novamente a tipagem
//     const id = req.body.id as string
//     const name = req.body.name as string
//     const price = req.body.price as number
//     const category = req.body.category as string

//     const newProducts: Product = {
//         id,
//         name,
//         price,
//         category,
//     }

//     products.push(newProducts)

//     res.status(201).send("Cadastro realizado com sucesso")
// })

app.get('/products/:id', (req: Request, res: Response) => {
	const id = req.params.id // não precisamos forçar a tipagem aqui, porque todo path params é string

	const result = products.find((product) => product.id === id)

  res.status(200).send(result)
})

app.delete('/products/:id', (req: Request, res: Response) => {
    try {
      const id = req.params.id
      if (!id) {
        res.status(400).send("Informe o id")
        return
      }
      const productsIndex = products.findIndex((product) => product.id === id)

      if (productsIndex === -1) {
        res.status(404).send("Produto não encontrado")
        return
      }
      const deletedProducts = products.splice(productsIndex, 1)
      res.status(200).send(deletedProducts)
    } catch (error) {
      res.status(500).send("Erro ao buscar usuário")
    }
  })

  app.put('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const name = req.body.name as string | undefined;
        const price = req.body.price as number | undefined;
        const category = req.body.category as string | undefined;
        
        // Verifica se o id foi informado
        if (!name) {
            res.status(400).send("Informe o nome do produto");
            return;
        }
        
        // Busca o produto pelo id
        const product = products.find((product) => product.id === id);
        
        // Verifica se o produto foi encontrado
        if (!product) {
            res.status(404).send("Produto não encontrado");
            return;
        }
        
        // Atualiza os dados do produto
        if (name) {
            product.name = name;
        }
        
        if (price) {
            product.price = price;
        }

        if (category) {
            product.category = category;
        }
        
        res.status(200).send("Produto atualizado com sucesso");

    } catch (error) {
        res.status(500).send("Erro ao atualizar produto");
    }
});

//fim do Product

app.post('/purchases', async (req: Request, res: Response) => {
  try {
      const id: string = Math.floor(Date.now() * Math.random()).toString(36) 
      const { buyer, totalPrice } = req.body
      if (typeof buyer !== "string" || typeof totalPrice!== "number") {
          res.status(400)
          throw new Error("passe um id de usuario ou valor toal e compra válidos")
      }
      const [userExists] = await db.raw(`SELECT * FROM users WHERE id = "${buyer}";`)
      if (!userExists) {
          throw new Error("Usuário não encontrado")
      }
      const newEntry = await db.raw(`INSERT INTO purchases (id,buyer, total_price) VALUES ("${id}", "${buyer}","${totalPrice}")`)
      res.status(201).send("Compra cadastrada com sucesso")
  } catch (error: any) {
      res.send(error.message)
  }
});
// app.post('/purchases', (req: Request, res: Response) => {
//     // forçamos novamente a tipagem
//     const userId = req.body.userId as string
//     const productId = req.body.productId as string
//     const quantity = req.body.quantity as number
//     const totalPrice = req.body.totalPrice as number

//     const newPurchases: Purchase = {
//         userId,
//         productId,
//         quantity,
//         totalPrice
//     }

//     purchases.push(newPurchases)

//     res.status(201).send("Compra realizado com sucesso")
// })

app.get('/purchases', (req: Request, res: Response) => {
    res.status(200).send(purchases)
})


app.get('/users/:id/purchases', (req: Request, res: Response) => {
    const id = req.params.id;
  
    try {
      const userPurchases = purchases.filter((purchase) => purchase.userId === id);
      
      if (!userPurchases || userPurchases.length === 0) {
        throw new Error('Usuário não existe.');
      }
  
      res.status(200).json(userPurchases);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  



// // Rota para buscar as compras de um usuário pelo id
// app.get('/users/:id/purchases', (req: Request, res: Response) => {
//     // Recebe o id do usuário pelo path params
//       const id = req.params.userId // não precisamos forçar a tipagem aqui, porque todo path params é string
  
//     // Procura as compras do usuário no array de compras
//       const result = purchases.find((purchase) => purchase.userId === id)
  
//     // Verifica se a busca retornou um resultado
//       if (result) {
//       // Se encontrou, envia a resposta com status 200 e o resultado da busca
//           res.status(200).send(result)
//       } else {
//       // Se não encontrou, envia a resposta com status 404 e uma mensagem de erro
//           res.status(404).send("Usuário não encontrado ou não possui compras")
//       }
//   })
  