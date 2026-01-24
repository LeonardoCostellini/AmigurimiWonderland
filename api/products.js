const { Pool, neonConfig } = require('@neondatabase/serverless')
const jwt = require('jsonwebtoken')
const ws = require('ws')

// 🔥 OBRIGATÓRIO no Neon Serverless
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

// ======================
// UTIL: validar URL
// ======================
function isValidUrl(url) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

module.exports = async (req, res) => {
  try {

    // ======================
    // LISTAR (PÚBLICO)
    // ======================
    if (req.method === 'GET') {
      const { rows } = await pool.query(`
        SELECT id, name, description, price, images
        FROM products
        ORDER BY id DESC
      `)

      return res.status(200).json(rows)
    }

    // 🔒 ADMIN
    const user = auth(req)
    if (!user) {
      return res.status(401).json({ error: 'Não autorizado' })
    }

    // ======================
    // CRIAR
    // ======================
    if (req.method === 'POST') {

      if (typeof req.body === 'string') {
        req.body = JSON.parse(req.body)
      }

      const { name, description, price, images } = req.body || {}

      if (
        typeof name !== 'string' ||
        name.trim() === '' ||
        price === undefined ||
        price === null ||
        !Array.isArray(images) ||
        images.length === 0
      ) {
        return res.status(400).json({ error: 'Dados inválidos' })
      }

      if (!images.every(img => typeof img === 'string' && isValidUrl(img))) {
        return res.status(400).json({
          error: 'Todas as imagens devem ser URLs válidas'
        })
      }

      const { rows } = await pool.query(`
        INSERT INTO products (name, description, price, images)
        VALUES ($1, $2, $3, $4::text[])
        RETURNING id, name, description, price, images
      `, [
        name.trim(),
        description || '',
        Number(price),
        images
      ])

      return res.status(201).json(rows[0])
    }

    // ======================
    // ATUALIZAR
    // ======================
    if (req.method === 'PUT') {

      if (typeof req.body === 'string') {
        req.body = JSON.parse(req.body)
      }

      const { id } = req.query
      if (!id) {
        return res.status(400).json({ error: 'ID obrigatório' })
      }

      const { name, description, price, images } = req.body || {}

      if (images) {
        if (
          !Array.isArray(images) ||
          !images.every(img => typeof img === 'string' && isValidUrl(img))
        ) {
          return res.status(400).json({
            error: 'Images deve ser um array de URLs válidas'
          })
        }
      }

      const { rows } = await pool.query(`
        UPDATE products SET
          name = COALESCE($1, name),
          description = COALESCE($2, description),
          price = COALESCE($3, price),
          images = COALESCE($4::text[], images)
        WHERE id = $5
        RETURNING id, name, description, price, images
      `, [
        name ?? null,
        description ?? null,
        price ?? null,
        images ?? null,
        id
      ])

      return res.status(200).json(rows[0])
    }

    // ======================
    // EXCLUIR
    // ======================
    if (req.method === 'DELETE') {
      const { id } = req.query
      if (!id) {
        return res.status(400).json({ error: 'ID obrigatório' })
      }

      await pool.query(`DELETE FROM products WHERE id = $1`, [id])
      return res.status(200).json({ success: true })
    }

    return res.status(405).json({ error: 'Method not allowed' })

  } catch (err) {
    console.error('🔥 PRODUCTS API ERROR:', err)
    return res.status(500).json({
      error: 'Erro interno',
      message: err.message
    })
  }
}
