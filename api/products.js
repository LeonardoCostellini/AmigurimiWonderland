const { Pool } = require('@neondatabase/serverless')
const jwt = require('jsonwebtoken')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})

function auth(req, res) {
  const header = req.headers.authorization

  if (!header) {
    res.status(401).json({ error: 'Token não enviado' })
    return null
  }

  const token = header.split(' ')[1]

  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    console.error('JWT ERROR:', err)
    res.status(401).json({ error: 'Token inválido' })
    return null
  }
}

module.exports = async (req, res) => {
  try {
    const user = auth(req, res)
    if (!user) return

    // ================= LISTAR =================
    if (req.method === 'GET') {
      const { rows } = await pool.query(`
        SELECT id, name, description, price, images
        FROM products
        ORDER BY "createdAt" DESC
      `)

      return res.status(200).json(rows)
    }

    // ================= CRIAR =================
    if (req.method === 'POST') {
      const { name, description, price, images } = req.body || {}

      // 👉 criar EXIGE ao menos 1 imagem
      if (!name || !price || !Array.isArray(images) || images.length === 0) {
        return res.status(400).json({
          error: 'Nome, preço e ao menos 1 imagem são obrigatórios'
        })
      }

      const { rows } = await pool.query(`
        INSERT INTO products (name, description, price, images)
        VALUES ($1, $2, $3, $4::jsonb)
        RETURNING *
      `, [
        name,
        description || '',
        price,
        JSON.stringify(images)
      ])

      return res.status(201).json(rows[0])
    }

    // ================= ATUALIZAR =================
    if (req.method === 'PUT') {
      const { id } = req.query
      if (!id) return res.status(400).json({ error: 'ID obrigatório' })

      const { name, description, price, images } = req.body || {}

      const imagesValue =
        Array.isArray(images) && images.length > 0
          ? JSON.stringify(images)
          : null

      const { rows } = await pool.query(`
        UPDATE products
        SET
          name = COALESCE($1, name),
          description = COALESCE($2, description),
          price = COALESCE($3, price),
          images = CASE
            WHEN $4 IS NOT NULL THEN $4::jsonb
            ELSE images
          END
        WHERE id = $5
        RETURNING *
      `, [
        name ?? null,
        description ?? null,
        price ?? null,
        imagesValue,
        id
      ])

      return res.status(200).json(rows[0])
    }

    // ================= EXCLUIR =================
    if (req.method === 'DELETE') {
      const { id } = req.query
      if (!id) return res.status(400).json({ error: 'ID obrigatório' })

      await pool.query(`DELETE FROM products WHERE id = $1`, [id])
      return res.status(200).json({ success: true })
    }

    return res.status(405).json({ error: 'Method not allowed' })

  } catch (err) {
    console.error('PRODUCTS API FATAL ERROR:', err)
    return res.status(500).json({ error: 'Erro interno' })
  }
}
