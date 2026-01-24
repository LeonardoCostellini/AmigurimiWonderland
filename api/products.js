const { Pool } = require('@neondatabase/serverless')
const jwt = require('jsonwebtoken')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})

// ======================
// AUTH
// ======================
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

    // ======================
    // GET (PÚBLICO)
    // ======================
    if (req.method === 'GET') {

      // 🔹 listar categorias únicas
      if (req.query.categories === 'true') {
        const { rows } = await pool.query(`
          SELECT DISTINCT category
          FROM products
          WHERE category IS NOT NULL AND category <> ''
          ORDER BY category
        `)

        return res.status(200).json(rows.map(r => r.category))
      }

      // 🔹 listar produtos (com ou sem filtro)
      const { category } = req.query

      const { rows } = category
        ? await pool.query(
            `
            SELECT id, name, description, price, images, category
            FROM products
            WHERE category = $1
            ORDER BY id DESC
            `,
            [category]
          )
        : await pool.query(
            `
            SELECT id, name, description, price, images, category
            FROM products
            ORDER BY id DESC
            `
          )

      return res.status(200).json(rows)
    }

    // ======================
    // 🔒 ADMIN (JWT)
    // ======================
    const user = auth(req)
    if (!user) {
      return res.status(401).json({ error: 'Não autorizado' })
    }

    // ======================
    // POST (CRIAR)
    // ======================
    if (req.method === 'POST') {
      if (typeof req.body === 'string') {
        req.body = JSON.parse(req.body)
      }

      const { name, description, price, images, category } = req.body || {}

      if (
        typeof name !== 'string' ||
        !name.trim() ||
        price === undefined ||
        !Array.isArray(images) ||
        images.length === 0
      ) {
        return res.status(400).json({ error: 'Dados inválidos' })
      }

      const cleanImages = images.filter(
        img => typeof img === 'string' && img.startsWith('http')
      )

      if (cleanImages.length === 0) {
        return res.status(400).json({ error: 'Imagens inválidas' })
      }

      const { rows } = await pool.query(
        `
        INSERT INTO products (name, description, price, images, category)
        VALUES ($1, $2, $3, $4::text[], $5)
        RETURNING id, name, description, price, images, category
        `,
        [
          name.trim(),
          description || '',
          Number(price),
          cleanImages,
          category && category.trim() ? category.trim() : 'Outros'
        ]
      )

      return res.status(201).json(rows[0])
    }

    // ======================
    // PUT (EDITAR)
    // ======================
    if (req.method === 'PUT') {
      if (typeof req.body === 'string') {
        req.body = JSON.parse(req.body)
      }

      const { id } = req.query
      if (!id) {
        return res.status(400).json({ error: 'ID obrigatório' })
      }

      const { name, description, price, images, category } = req.body || {}

      const cleanImages = Array.isArray(images)
        ? images.filter(img => typeof img === 'string' && img.startsWith('http'))
        : null

      const { rows } = await pool.query(
        `
        UPDATE products SET
          name = COALESCE($1, name),
          description = COALESCE($2, description),
          price = COALESCE($3, price),
          images = COALESCE($4::text[], images),
          category = COALESCE($5, category)
        WHERE id = $6
        RETURNING id, name, description, price, images, category
        `,
        [
          name?.trim() || null,
          description ?? null,
          price ?? null,
          cleanImages,
          category?.trim() || null,
          id
        ]
      )

      return res.status(200).json(rows[0])
    }

    // ======================
    // DELETE
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
