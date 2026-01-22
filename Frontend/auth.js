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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
      return res.status(200).json({ 
        success: true, 
        message: 'Login realizado com sucesso',
        admin: { id: rows[0].id, email: rows[0].email }
      });
    } else {
      // Credenciais inválidas
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
  }
};