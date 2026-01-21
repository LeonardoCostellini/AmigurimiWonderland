const express = require('express');
const pool = require('../db');
const router = express.Router();


router.get('/', async (_, res) => {
try {
const { rows } = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
res.json(rows);
} catch (error) {
console.error('Erro ao listar produtos:', error);
res.status(500).json({ error: 'Erro ao listar produtos' });
}
});


router.post('/', async (req, res) => {
try {
const { name, description, price, stock_info, image_url, category_id } = req.body;
await pool.query(
'INSERT INTO products (name, description, price, stock_info, image_url, category_id) VALUES ($1,$2,$3,$4,$5,$6)',
[name, description, price, stock_info, image_url, category_id]
);
res.sendStatus(201);
} catch (error) {
console.error('Erro ao criar produto:', error);
res.status(500).json({ error: 'Erro ao criar produto' });
}
});


module.exports = router;