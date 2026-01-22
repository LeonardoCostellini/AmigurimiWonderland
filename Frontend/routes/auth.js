const express = require('express');
const pool = require('../db');
const router = express.Router();

// Rota de login
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    // Buscar admin no banco de dados
    const { rows } = await pool.query(
      'SELECT * FROM admins WHERE email = $1 AND password_hash = $2',
      [email, password]
    );

    if (rows.length > 0) {
      // Login bem-sucedido
      res.json({ 
        success: true, 
        message: 'Login realizado com sucesso',
        admin: { id: rows[0].id, email: rows[0].email }
      });
    } else {
      // Credenciais inválidas
      res.status(401).json({ error: 'Email ou senha inválidos' });
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
