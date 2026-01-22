const express = require('express');
const pool = require('../db');
const router = express.Router();


router.get('/', async (_, res) => {
const { rows } = await pool.query('SELECT * FROM categories');
res.json(rows);
});


router.post('/', async (req, res) => {
const { name, description } = req.body;
await pool.query(
'INSERT INTO categories (name, description) VALUES ($1,$2)',
[name, description]
);
res.sendStatus(201);
});


module.exports = router;