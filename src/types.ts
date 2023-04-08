// estamos dentro do arquivo src/types.ts tipando um vídeo do youtube

export type User = {
    id: string,
    email: string,
    password: string,
  }

  export type Product = {
    id: string,
    name: string,
    price:number,
    category: string,
  }

  export type Purchase = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice:number
  }