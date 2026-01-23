const { Pool } = require('@neondatabase/serverless')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})

module.exports = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT id, name, description, price, images
      FROM products
      LIMIT 5
    `)

    return res.json(rows)
  } catch (err) {
    console.error('SQL ERROR:', err)
    return res.status(500).json({ error: err.message })
  }
}
