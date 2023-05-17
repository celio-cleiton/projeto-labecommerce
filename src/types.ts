export type User = {
  id: string,
  email: string,
  password: string
}

export type Product = {
  id: string,
  name: string,
  price: number,
  description: string,
  category: Category,
  imageUrl: string
}

export type Purchase = {
  userId: string,
  productId: string,
  quantity: number,
  totalPrices: number
}

  export enum Category {
    ELETRONIC = "produtos eletronicos",
    CARS = "carros",
    MOTO = "moto"
  }