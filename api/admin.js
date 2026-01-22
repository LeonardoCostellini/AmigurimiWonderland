const { Pool } = require('pg');

// Configuração do pool de conexão (compartilhado)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 1
});

// Handler unificado para Vercel Serverless
module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Extrair o path da URL
    const path = req.url.split('?')[0];

    // ==================== AUTH ROUTES ====================
    if (path.includes('/auth')) {
      if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
      }

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
    }

    // ==================== PRODUCTS ROUTES ====================
    if (path.includes('/products')) {
      // GET - Buscar todos os produtos
      if (req.method === 'GET') {
        const { rows } = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
        return res.status(200).json(rows);
      }

      // POST - Criar novo produto
      if (req.method === 'POST') {
        const { name, description, price, category_id, image_url, stock_info } = req.body;
        const { rows } = await pool.query(
          'INSERT INTO products (name, description, price, category_id, image_url, stock_info) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
          [name, description, price, category_id, image_url, stock_info]
        );
        return res.status(201).json(rows[0]);
      }

      // PUT - Atualizar produto
      if (req.method === 'PUT') {
        const id = req.query.id || req.url.split('/').pop();
        const { name, description, price, category_id, image_url, stock_info } = req.body;
        const { rows } = await pool.query(
          'UPDATE products SET name = $1, description = $2, price = $3, category_id = $4, image_url = $5, stock_info = $6 WHERE id = $7 RETURNING *',
          [name, description, price, category_id, image_url, stock_info, id]
        );
        return res.status(200).json(rows[0]);
      }

      // DELETE - Deletar produto
      if (req.method === 'DELETE') {
        const id = req.query.id || req.url.split('/').pop();
        await pool.query('DELETE FROM products WHERE id = $1', [id]);
        return res.status(204).end();
      }
    }

    // ==================== CATEGORIES ROUTES ====================
    if (path.includes('/categories')) {
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
    }

    // Se nenhuma rota corresponder
    return res.status(404).json({ error: 'Rota não encontrada' });

  } catch (error) {
    console.error('Erro na API:', error);
    return res.status(500).json({ 
      error: 'Erro interno do servidor', 
      details: error.message 
    });
  }
};
