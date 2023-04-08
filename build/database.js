"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.products = exports.persons = void 0;
exports.persons = [
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
];
exports.products = [
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
];
exports.purchases = [
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
];
//# sourceMappingURL=database.js.map