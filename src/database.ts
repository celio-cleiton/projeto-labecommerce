import { Product, User, Purchase } from "./types";
import { PET_SIZE, TPet } from "./types";

export const persons: User[] = [
    {
        id: '01',
        email: 'roberto@gmail.com',
        password: '12345',
    },
    {
        id: '02',
        email: 'carlos@gmail.com',
        password: '123456',
    },
    {
        id: '03',
        email: 'robertocarlos@gmail.com',
        password: '1234567',
    }
]

export const products: Product[] = [
    {
        id: '01',
        name: 'Smartphone',
        price: 999,
        category: 'eletronic',
    },
    {
        id: '02',
        name: 'SmartTV',
        price: 2500,
        category: 'eletronic',
    },
    {
        id: '03',
        name: 'NoteBook',
        price: 9999,
        category: 'eletronic',
    }
]

export const purchases: Purchase[] = [
    {
        userId: '01',
        productId: '01',
        quantity: 2,
        totalPrice: 1998
    },
    {
        userId: '02',
        productId: '02',
        quantity: 1,
        totalPrice: 2500
    },
    {
        userId: '03',
        productId: '03',
        quantity: 1,
        totalPrice: 9999
    }
]

export const pets: TPet[] = [
	{
		id: "p001",
		name: "Thor",
		age: 5,
		size: PET_SIZE.MEDIUM
	},
	{
		id: "p002",
		name: "Lili",
		age: 10,
		size: PET_SIZE.SMALL
	},
	{
		id: "p003",
		name: "Pingo",
		age: 3,
		size: PET_SIZE.LARGE
	},
	{
		id: "p004",
		name: "Luna",
		age: 7,
		size: PET_SIZE.MEDIUM
	}
]