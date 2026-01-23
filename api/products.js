const { Pool } = require('@neondatabase/serverless')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})

module.exports = async (req, res) => {
  try {
    // ======================
    // LISTAR (GET)
    // ======================
    if (req.method === 'GET') {
      const { rows } = await pool.query(`
        SELECT id, name, description, price, images
        FROM products
        ORDER BY created_at DESC
      `)
      return res.status(200).json(rows)
    }

    // ======================
    // CRIAR (POST)
    // ======================
    if (req.method === 'POST') {
      const { name, description, price, images } = req.body || {}

      if (!name || !price || !Array.isArray(images)) {
        return res.status(400).json({ error: 'Dados inválidos' })
      }

      const { rows } = await pool.query(`
        INSERT INTO products (name, description, price, images)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `, [name, description || '', price, JSON.stringify(images)])

      return res.status(201).json(rows[0])
    }

    // ======================
    // ATUALIZAR (PUT)
    // ======================
    if (req.method === 'PUT') {
      const { id } = req.query
      const { name, description, price, images } = req.body || {}

      if (!id) return res.status(400).json({ error: 'ID obrigatório' })

      const { rows } = await pool.query(`
        UPDATE products
        SET
          name = COALESCE($1, name),
          description = COALESCE($2, description),
          price = COALESCE($3, price),
          images = COALESCE($4, images)
        WHERE id = $5
        RETURNING *
      `, [name, description, price, images && JSON.stringify(images), id])

      return res.status(200).json(rows[0])
    }

    // ======================
    // EXCLUIR (DELETE)
    // ======================
    if (req.method === 'DELETE') {
      const { id } = req.query
      if (!id) return res.status(400).json({ error: 'ID obrigatório' })

      await pool.query(`DELETE FROM products WHERE id = $1`, [id])
      return res.status(200).json({ success: true })
    }

    return res.status(405).json({ error: 'Method not allowed' })

  } catch (err) {
    console.error('PRODUCT API ERROR:', err)
    res.status(500).json({ error: 'Erro interno' })
  }
}
