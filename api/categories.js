const { Pool } = require('@neondatabase/serverless')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})

module.exports = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT DISTINCT category
      FROM products
      WHERE category IS NOT NULL
      ORDER BY category
    `)

    res.status(200).json(rows.map(r => r.category))
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao carregar categorias' })
  }
}
