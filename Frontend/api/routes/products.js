const express = require('express');
const pool = require('../db');
const router = express.Router();

// Buscar todos os produtos
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products ORDER BY id');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

// Criar novo produto
router.post('/', async (req, res) => {
  try {
    const { name, description, price, category_id, image_url } = req.body;
    const { rows } = await pool.query(
      'INSERT INTO products (name, description, price, category_id, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, price, category_id, image_url]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
});

// Atualizar produto
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category_id, image_url } = req.body;
    const { rows } = await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3, category_id = $4, image_url = $5 WHERE id = $6 RETURNING *',
      [name, description, price, category_id, image_url, id]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
});

// Deletar produto
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.sendStatus(204);
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
});

module.exports = router;