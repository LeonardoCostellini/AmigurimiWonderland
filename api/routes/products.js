const express = require('express');
const pool = require('../db');
const router = express.Router();

// Listar todos os produtos
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
    const { name, description, price, stock, image_url, category_id } = req.body;
    
    if (!name || !price) {
      return res.status(400).json({ error: 'Nome e preço são obrigatórios' });
    }
    
    const result = await pool.query(
      'INSERT INTO products (name, description, price, stock, image_url, category_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, description, price, stock || 0, image_url, category_id]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
});

// Atualizar produto
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, image_url, category_id } = req.body;
    
    const result = await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3, stock = $4, image_url = $5, category_id = $6 WHERE id = $7 RETURNING *',
      [name, description, price, stock, image_url, category_id, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
});

// Deletar produto
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    
    res.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
});

module.exports = router;
