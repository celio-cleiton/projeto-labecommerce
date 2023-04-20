import { Product, User, Purchase, Category } from "./types";


export const users: User[] = [
    {
        id: 'u01',
        email: 'roberto@gmail.com',
        password: '12345',
    },
    {
        id: 'u02',
        email: 'carlos@gmail.com',
        password: '123456',
    },
    {
        id: 'u03',
        email: 'robertocarlos@gmail.com',
        password: '1234567',
    },
    {
        id: 'u04',
        email: 'celiocleito@gmail.com',
        password: '12345678',
    }
]

export const products: Product[] = [
    {
        id: 'p01',
        name: 'Smartphone',
        price: 999,
        category: 'eletronic',
    },
    {
        id: 'p02',
        name: 'SmartTV',
        price: 2500,
        category: 'eletronic',
    },
    {
        id: 'p03',
        name: 'NoteBook',
        price: 9999,
        category: 'eletronic',
    },
    {
        id: 'p04',
        name: 'Cadeira Gamer',
        price: 400,
        category: 'Escritório',
    }
]

export const purchases: Purchase[] = [
    {
        userId: 'u01',
        productId: 'p01',
        quantity: 2,
        totalPrice: 1998
    },
    {
        userId: 'u02',
        productId: 'p02',
        quantity: 1,
        totalPrice: 2500
    },
    {
        userId: 'u03',
        productId: 'p03',
        quantity: 1,
        totalPrice: 9999
    },
    {
        userId: 'u04',
        productId: 'p04',
        quantity: 1,
        totalPrice: 400
    }
]


// Array de usuários
let dataUser: User[] = []

// Array de produtos
let dataProduct: Product[] = []

// Array de compras
let dataPurchase: Purchase[] = []

// Função para criar um usuário e adicioná-lo ao array de usuários
export const creatUser = (id: string, email: string, password: string): string => {
    dataUser.push({ id, email, password })
    return "Cadastro realizado com sucesso"
}

// Função para obter todos os usuários cadastrados
export const getAllUsers = (): User[] => {
    return dataUser
}

// Função para criar um produto e adicioná-lo ao array de produtos
export const createProduct = (id: string, name: string, price: number, category: Category): string => {
    dataProduct.push({ id, name, price, category })
    return "Produto criado com sucesso"
}

// Função para obter todos os produtos cadastrados
export const getAllProducts = (): Product[] => {
    return dataProduct
}

// Função para obter um produto pelo seu ID
export const getProductById = (idToSearch: string): Product | undefined => {
    const findProduct = dataProduct.find(prod => prod.id === idToSearch)
    return findProduct
}

// Função para buscar produtos pelo nome
export const queryProductsByName = (q: string): Product[] => {
    const findProduct = dataProduct.filter(prod => prod.name.toLowerCase().includes(q.toLowerCase()))
    return findProduct
}

// Função para criar uma compra e adicioná-la ao array de compras
export const createPurchase = (userId: string, productId: string, quantity: number, totalPrice: number): string => {
    dataPurchase.push({ userId, productId, quantity, totalPrice })
    return "Compra realizada com sucesso"
}

// Função para obter todas as compras de um usuário
export const getAllPurchasesFromUserId = (userIdToSearch: string): Purchase[] => {
    const findPurchase = dataPurchase.filter(purchase => purchase.userId === userIdToSearch)
    return findPurchase
}

// Função para deletar um usuário pelo seu ID
export const deleteUserById = (id: string): string => {
    const userIndex = dataUser.findIndex((user) => user.id === id)
    if (userIndex >= 0) {
        dataUser.splice(userIndex, 1)
    }
    return "User apagado com sucesso"
}

// Função para deletar um produto pelo seu ID
export const deleteProductById = (id: string): string => {
    const productIndex = dataProduct.findIndex((product) => product.id === id)
    if (productIndex >= 0) {
        dataProduct.splice(productIndex, 1)
    }
    return "Produto apagado com sucesso"
}

// Atualiza um usuário com o ID fornecido
export const updateUserById = (id: string, newEmail: string, newPassword: string): string => {
    const userToUpdate = dataUser.find((user) => user.id === id)
    if (userToUpdate) {
        userToUpdate.email = newEmail
        userToUpdate.password = newPassword
        return "Usuário atualizado com sucesso"
    }
    return "Usuário não encontrado"
}

// Atualiza um produto com o ID fornecido
export const editProductbyid = (id: string, nome: string|undefined, price: number|undefined, category: Category|undefined):string =>{
    const product = dataProduct.find((product) => product.id === id)
    if (product) {
        product.name = nome || product.name
        product.price = price || product.price
        product.category = category || product.category
    }
    return "Produto atualizado com sucesso"
}