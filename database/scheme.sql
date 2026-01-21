CREATE TABLE admins (
id SERIAL PRIMARY KEY,
email TEXT UNIQUE NOT NULL,
password_hash TEXT NOT NULL
);


CREATE TABLE categories (
id SERIAL PRIMARY KEY,
name TEXT NOT NULL,
description TEXT
);


CREATE TABLE products (
id SERIAL PRIMARY KEY,
name TEXT NOT NULL,
description TEXT,
price NUMERIC(10,2) NOT NULL,
stock INT DEFAULT 0,
image_url TEXT,
category_id INT REFERENCES categories(id)
);