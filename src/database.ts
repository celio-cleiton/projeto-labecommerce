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
];

export const products: Product[] = [
  {
    id: 'p01',
    name: 'Smartphone',
    price: 999,
    description:'telefone',
    imageUrl:'',
    category: Category.ELETRONIC,
  },
  {
    id: 'p02',
    name: 'SmartTV',
    price: 2500,
    description:'televisão',
    imageUrl:'',
    category: Category.ELETRONIC,
  },
  {
    id: 'p03',
    name: 'NoteBook',
    price: 9999,
    description:'Note Book',
    imageUrl:'',
    category: Category.ELETRONIC,
  },
  {
    id: 'p04',
    name: 'Cadeira Gamer',
    price: 400,
    description:'Cadeira',
    imageUrl:'',
    category: Category.ELETRONIC,
  }
];

export const purchases: Purchase[] = [
  {
    userId: 'u01',
    productId: 'p01',
    quantity: 2,
    totalPrices: 1998
  },
  {
    userId: 'u02',
    productId: 'p02',
    quantity: 1,
    totalPrices: 2500
  },
  {
    userId: 'u03',
    productId: 'p03',
    quantity: 1,
    totalPrices: 9999
  },
  {
    userId: 'u04',
    productId: 'p04',
    quantity: 1,
    totalPrices: 400
  }
];

export const createUser = (id: string, email: string, password: string): string => {
  users.push({ id, email, password });
  return "Cadastro realizado com sucesso";
};

export const getAllUsers = (): User[] => {
  return users;
};

export const createProduct = (id: string, name: string, price: number,description:string,imageUrl:string, category: Category): string => {
  products.push({ id, name, price,description, imageUrl ,category });
  return "Produto criado com sucesso";
};

export const getAllProducts = (): Product[] => {
  return products;
};

export const getProductById = (idToSearch: string): Product | undefined => {
  const findProduct = products.find(prod => prod.id === idToSearch);
  return findProduct;
};

export const editProductById = (id: string, name: string | undefined, price: number | undefined, description: string | undefined, imageUrl: string | undefined, category: Category | undefined): string => {
  const productIndex = products.findIndex((product) => product.id === id);

  if (productIndex !== -1) {
    const product = products[productIndex];
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;
    product.imageUrl = imageUrl || product.imageUrl;
    
  } else {
    throw new Error("Produto não encontrado");
  }

  return "Atualização realizada com sucesso";
};

export const queryProductsByName = (q: string): Product[] => {
  const findProduct = products.filter(prod => prod.name.toLowerCase().includes(q.toLowerCase()));
  return findProduct;
};

export const createPurchase = (userId: string, productId: string, quantity: number, totalPrices: number): string => {
  purchases.push({ userId, productId, quantity, totalPrices });
  return "Compra realizada com sucesso";
};

export const getAllPurchasesFromUserId = (userIdToSearch: string): Purchase[] => {
  const findPurchase = purchases.filter(purchase => purchase.userId === userIdToSearch);
  return findPurchase;
};

export const deleteUserById = (id: string): string => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex >= 0) {
    users.splice(userIndex, 1);
  }
  return "Usuário apagado com sucesso";
};

export const deleteProductById = (id: string): string => {
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex >= 0) {
      products.splice(productIndex, 1);
    }
    return "Produto apagado com sucesso";
};
  
export const editUserById = (id: string, email: string | undefined, password: string | undefined): string => {
    const user = users.find((user) => user.id === id);
    if (user) {
      user.email = email || user.email;
      user.password = password || user.password;
    }
    return "Atualização realizada com sucesso";
};

export const getPurchaseById = (userId: string): Purchase | undefined => {
  const findPurchase = purchases.find(purchase => purchase.userId === userId);
  return findPurchase;
};
