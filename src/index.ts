import express, { Request, Response } from 'express';
import cors from 'cors';
import { deleteProductById, deleteUserById, editUserById, getAllPurchasesFromUserId, getPurchaseById, products, purchases, users } from "./database";
import { db } from './database/knex';
import { Product } from './types';

console.log(users);
console.log(products);
console.log(purchases);

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/ping", async (req: Request, res: Response) => {
  try {
    res.status(200).send({ message: "Pong!" });
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//endpoints

//pegar todos os usuários
app.get('/users', async (req: Request, res: Response) => {
  try {
    const result = await db.raw('SELECT * FROM users;');
    res.status(200).send(result);
    console.log("olá")
  } catch (error: any) {
    res.status(400).send(error.message);
  }
  console.log("olá fora do try")
});
//criar usuários.
app.post('/users', async (req: Request, res: Response) => {
  try {
    const id: string = Math.floor(Date.now() * Math.random()).toString(36);
    const { name, email, password } = req.body;
    if (typeof name !== "string" || typeof email !== "string") {
      return res.status(400).send("'nome' e 'email' devem ser do tipo string");
    }
    const [invalidUser] = await db.raw(`SELECT * FROM users WHERE id = "${id}";`);

    if (invalidUser) {
      res.status(400);
      throw new Error("Este ID já está cadastrado");
    }

    const [invalidEmail] = await db.raw(`SELECT * FROM users WHERE email = "${email}";`);
    if (invalidEmail) {
      res.status(400);
      throw new Error("Este email já está cadastrado");
    }

    await db.raw(`INSERT INTO users (id, name, email, password) VALUES ("${id}", "${name}", "${email}", "${password}")`);
    res.status(201).send("Cadastro realizado com sucesso");
  } catch (error: any) {
    res.send(error.message);
  }
});
//criar produtos.
app.post('/products', async (req: Request, res: Response) => {
  try {
    const id: string = Math.floor(Date.now() * Math.random()).toString(36);
    const { name, price, description, imageUrl } = req.body;
    if (typeof name !== "string" || typeof price !== "number" || typeof description !== "string" || typeof imageUrl !== "string") {
      res.status(400);
      throw new Error("'id', 'nome', 'description' devem ser do tipo string e 'price' do tipo number");
    }
    const [invalidProductId] = await db.raw(`SELECT * FROM products WHERE id = "${id}";`);
    if (invalidProductId) {
      res.status(400);
      throw new Error("Este ID já possui um produto");
    }
    await db.raw(`INSERT INTO products (id, name, price, description, imageUrl) VALUES ("${id}", "${name}", ${price}, "${description}", "${imageUrl}")`);
    res.status(201).send("Produto cadastrado com sucesso");
  } catch (error: any) {
    res.send(error.message);
  }
});
//pegar todos os produtos.
app.get('/products', async (req: Request, res: Response) => {
  try {
    const result = await db.raw('SELECT * FROM products;');
    res.status(200).send(result);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});
//pesquiser produtos por nome.
app.get('/product/search', async (req: Request, res: Response) => {
  try {
    const q = req.query.q as string;
    const result = await db.raw(`SELECT * FROM products WHERE name LIKE '%${q.toLowerCase()}%';`);
    res.status(200).send(result);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});
//atualizar produto por id.
app.put('/products/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, description, imageUrl, category } = req.body;
    // Verifica se o produto existe no banco de dados
    const productExists = await db.raw(`SELECT * FROM products WHERE id = "${id}";`);
    if (!productExists) {
      throw new Error("Produto não encontrado");
    }
    // Atualiza o produto no banco de dados
    await db.raw(`
      UPDATE products 
      SET 
        id =  COALESCE("${id}", id),  
        name = COALESCE("${name}", name),
        price = COALESCE(${price}, price),
        description = COALESCE("${description}", description),
        imageUrl = COALESCE("${imageUrl}", imageUrl),
        category = COALESCE("${category}", category)
      WHERE id = "${id}"
    `);
    // Obtém o produto atualizado do banco de dados
    const updatedProduct = await db.raw(`SELECT * FROM products WHERE id = "${id}";`);

    res.status(200).send(updatedProduct);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});
//criar compras.
app.post('/purchases', async (req: Request, res: Response) => {
  try {
    const id: string = Math.floor(Date.now() * Math.random()).toString(36);
    const { buyer, total_price } = req.body;
    if (typeof buyer !== "string" || typeof total_price !== "number") {
      res.status(400);
      throw new Error("Passe um ID de usuário ou valor total de compra válidos");
    }
    const [userExists] = await db.raw(`SELECT * FROM users WHERE id = "${buyer}";`);
    if (!userExists) {
      throw new Error("Usuário não encontrado");
    }
    await db.raw(`INSERT INTO purchases (id, buyer, total_price) VALUES ("${id}", "${buyer}", ${total_price})`);
    res.status(201).send("Compra cadastrada com sucesso");
  } catch (error: any) {
    res.send(error.message);
  }
});
//deletar compras por id.
app.delete('/purchases/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const purchaseExists = await db.raw(`SELECT * FROM purchases WHERE id = "${id}";`);
    if (!purchaseExists) {
      throw new Error("Compra não encontrada");
    }
    await db.raw(`DELETE FROM purchases WHERE id = "${id}";`);
    res.status(200).send("Pedido cancelado com sucesso");
  } catch (error: any) {
    res.send(error.message);
  }
});
//pegar compra por id
app.get('/purchases/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const purchase = await db.raw(`SELECT * FROM purchases WHERE id = "${id}";`);

    if (purchase.length === 0) {
      throw new Error("Compra não encontrada");
    }

    res.status(200).send(purchase[0]);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});
//pegar compras do usuário por id.
app.get('/users/:id/purchases', (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const userExists = users.find((user) => user.id === id);
    if (!userExists) {
      throw new Error("Usuário não encontrado");
    }
    const result = getAllPurchasesFromUserId(id);
    res.status(200).send(result);
  } catch (error: any) {
    res.send(error.message);
  }
});
//pegar produtos por id.
app.get('/products/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const result = await db.raw(`SELECT * FROM products WHERE id = "${id}";`);
    const products = result;

    if (products.length === 0) {
      throw new Error("Produto não encontrado");
    }

    res.status(200).send(products[0]);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});
//atualizar usuário por id.
app.put('/users/:id', (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newEmail = req.body.email as string | undefined;
    const newPassword = req.body.password as string | undefined;
    if (newEmail) {
      if (typeof newEmail !== "string") {
        throw new Error("'email' deve ser do tipo string");
      }
    }
    if (newPassword) {
      if (typeof newPassword !== "string") {
        throw new Error("'password' deve ser do tipo string");
      }
    }
    const userExists = users.find((user) => user.id === id);
    if (!userExists) {
      throw new Error("Usuário não encontrado");
    }
    const result = editUserById(id, newEmail, newPassword);
    res.status(200).send(result);
  } catch (error: any) {
    res.send(error.message);
  }
});
//deletar usuário por id.
app.delete('/users/:id', (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const userExists = users.find((user) => user.id === id);
    if (!userExists) {
      throw new Error("Usuário não encontrado");
    }
    deleteUserById(id);
    res.status(200).send("Usuário excluído com sucesso");
  } catch (error: any) {
    res.send(error.message);
  }
});
//deletar produto por id.
app.delete('/products/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const productExists = await db.raw(`SELECT * FROM products WHERE id = "${id}";`);
    if (!productExists) {
      throw new Error("Produto não encontrado");
    }
    await db.raw(`DELETE FROM products WHERE id = "${id}";`);
    res.status(200).send("Produto excluído com sucesso");
  } catch (error: any) {
    res.send(error.message);
  }
});

