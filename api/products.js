const { Pool, neonConfig } = require('@neondatabase/serverless')
const ws = require('ws')
const jwt = require('jsonwebtoken')

neonConfig.webSocketConstructor = ws

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

function auth(req) {
  const header = req.headers.authorization
  if (!header) return null

  try {
    const token = header.split(' ')[1]
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    return null
  }
}

module.exports = async (req, res) => {
  try {

    // ===== LISTAR (PÚBLICO) =====
    if (req.method === 'GET') {
      const { rows } = await pool.query(`
        SELECT id, name, description, price, images
        FROM products
        ORDER BY id DESC
      `)

      return res.status(200).json(rows)
    }

    // ===== ADMIN =====
    const user = auth(req)
    if (!user) {
      return res.status(401).json({ error: 'Não autorizado' })
    }

    // ===== CRIAR =====
    if (req.method === 'POST') {
      const { name, description, price, images } =
        typeof req.body === 'string' ? JSON.parse(req.body) : req.body

      const { rows } = await pool.query(`
        INSERT INTO products (name, description, price, images)
        VALUES ($1, $2, $3, $4::text[])
        RETURNING *
      `, [
        name,
        description || '',
        price,
        images
      ])

      return res.status(201).json(rows[0])
    }

    // ===== ATUALIZAR =====
    if (req.method === 'PUT') {
      const { id } = req.query
      const { name, description, price, images } =
        typeof req.body === 'string' ? JSON.parse(req.body) : req.body

      const { rows } = await pool.query(`
        UPDATE products SET
          name=$1, description=$2, price=$3, images=$4::text[]
        WHERE id=$5
        RETURNING *
      `, [name, description, price, images, id])

      return res.status(200).json(rows[0])
    }

    // ===== EXCLUIR =====
    if (req.method === 'DELETE') {
      const { id } = req.query
      await pool.query('DELETE FROM products WHERE id=$1', [id])
      return res.status(200).json({ success: true })
    }

    res.status(405).json({ error: 'Método não permitido' })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro interno' })
  }
}
