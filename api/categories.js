const { Pool } = require('pg');

// Configuração do pool de conexão
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 1
});

// Handler para Vercel Serverless
module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // GET - Buscar todas as categorias
    if (req.method === 'GET') {
      const { rows } = await pool.query('SELECT * FROM categories ORDER BY name');
      return res.status(200).json(rows);
    }

    // POST - Criar nova categoria
    if (req.method === 'POST') {
      const { name, description } = req.body;
      const { rows } = await pool.query(
        'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *',
        [name, description]
      );
      return res.status(201).json(rows[0]);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Erro na API de categorias:', error);
    return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
  }
};