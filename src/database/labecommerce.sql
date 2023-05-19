-- Active: 1684199183866@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime'))
    );

DROP TABLE users;

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        imageUrl TEXT NOT NULL
    );

DROP TABLE products;

CREATE TABLE
    purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        buyer TEXT NOT NULL,
        total_price REAL NOT NULL,
        created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
        paid INTEGER NOT NULL DEFAULT (0),
        FOREIGN KEY (buyer) REFERENCES users(id)
    );

DROP TABLE purchases;

CREATE TABLE
    purchases_products(
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL DEFAULT (1),
        FOREIGN KEY (purchase_id) REFERENCES purchases (id),
        FOREIGN KEY (product_id) REFERENCES products (id)
    );

DROP TABLE purchases_products;

INSERT INTO
    users (id, name, email, password)
VALUES (
        "u001",
        "Roberto",
        "roberto@email.com",
        "rc12345"
    ), (
        "u002",
        "Carlos",
        "carlos@email.com",
        "cr123456"
    ), (
        "u003",
        "Celio",
        "celio@email.com",
        "cc1234567"
    );

SELECT * FROM users;

INSERT INTO
    products (
        id,
        name,
        price,
        description,
        category,
        imageUrl
    )
VALUES (
        "p001",
        "tv",
        5800,
        "descrição",
        "eletronico",
        "tv.png"
    ), (
        "p002",
        "smartTv",
        4500,
        "descrição",
        "eletronico",
        "smartTv.png"
    ), (
        "p003",
        "smartPhone",
        1000,
        "descrição",
        "eletronico",
        "smartPhone.png"
    ), (
        "p004",
        "monitor",
        1400,
        "descrição",
        "eletronico",
        "monitor.png"
    ), (
        "p005",
        "gabinete",
        200,
        "descrição",
        "eletronico",
        "gabinete.png"
    );

SELECT * FROM products;

INSERT INTO users (id,name, email, password)
VALUES
("u004", "Cleiton", "cleiton@email.com", "c12345678");

INSERT INTO products (id, name, price, category, description, imageUrl)
VALUES
("p006", "iphone", 7500, "descrição", "eletronico", "iphone.png");

INSERT INTO purchases (id, buyer, total_price)
VALUES
("c001","u002", 3000),
("c002", "u002", 5600),
("c003", "u001", 200),
("c004", "u004", 0);

SELECT * FROM purchases;
SELECT * FROM users
INNER JOIN purchases
ON users.id=purchases.buyer
WHERE users.id="u003";
INSERT INTO purchases_products(purchase_id, product_id, quantity)
VALUES
('c001','p003',3),
('c001','p004',1),
('c002','p002',4),
('c003','p005',1);
SELECT * FROM purchases_products;
SELECT * FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON purchases_products.product_id = products.id;