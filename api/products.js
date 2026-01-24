const { Pool } = require('@neondatabase/serverless')
const jwt = require('jsonwebtoken')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})

function auth(req) {
  const header = req.headers.authorization
  if (!header) return null

  try {
    return jwt.verify(header.split(' ')[1], process.env.JWT_SECRET)
  } catch {
    return null
  }
}

module.exports = async (req, res) => {
  try {

    // ======================
    // GET (PÚBLICO)
    // ======================
    if (req.method === 'GET') {
      const { category } = req.query

      const { rows } = category
        ? await pool.query(
            `SELECT * FROM products WHERE category = $1 ORDER BY id DESC`,
            [category]
          )
        : await pool.query(
            `SELECT * FROM products ORDER BY id DESC`
          )

      return res.status(200).json(rows)
    }

    // 🔒 ADMIN
    const user = auth(req)
    if (!user) {
      return res.status(401).json({ error: 'Não autorizado' })
    }

    // ======================
    // POST
    // ======================
    if (req.method === 'POST') {
      const { name, description, price, images, category } = req.body || {}

      if (!name || !price || !Array.isArray(images)) {
        return res.status(400).json({ error: 'Dados inválidos' })
      }

      const { rows } = await pool.query(`
        INSERT INTO products (name, description, price, images, category)
        VALUES ($1, $2, $3, $4::text[], $5)
        RETURNING *
      `, [
        name.trim(),
        description || '',
        Number(price),
        images,
        category || 'Geral'
      ])

      return res.status(201).json(rows[0])
    }

    // ======================
    // PUT
    // ======================
    if (req.method === 'PUT') {
      const { id } = req.query
      if (!id) return res.status(400).json({ error: 'ID obrigatório' })

      const { name, description, price, images, category } = req.body || {}

      const { rows } = await pool.query(`
        UPDATE products SET
          name = COALESCE($1, name),
          description = COALESCE($2, description),
          price = COALESCE($3, price),
          images = COALESCE($4::text[], images),
          category = COALESCE($5, category)
        WHERE id = $6
        RETURNING *
      `, [
        name ?? null,
        description ?? null,
        price ?? null,
        images ?? null,
        category ?? null,
        id
      ])

      return res.status(200).json(rows[0])
    }

    // ======================
    // DELETE
    // ======================
    if (req.method === 'DELETE') {
      const { id } = req.query
      if (!id) return res.status(400).json({ error: 'ID obrigatório' })

      await pool.query(`DELETE FROM products WHERE id = $1`, [id])
      return res.status(200).json({ success: true })
    }

    return res.status(405).json({ error: 'Method not allowed' })

  } catch (err) {
    console.error('API ERROR:', err)
    return res.status(500).json({ error: err.message })
  }
}
