const express = require('express');
const pool = require('../db');
const router = express.Router();


router.get('/', async (_, res) => {
const { rows } = await pool.query('SELECT * FROM products');
res.json(rows);
});


router.post('/', async (req, res) => {
const { name, description, price, stock, image_url } = req.body;
await pool.query(
'INSERT INTO products (name, description, price, stock, image_url) VALUES ($1,$2,$3,$4,$5)',
[name, description, price, stock, image_url]
);
res.sendStatus(201);
});


module.exports = router;