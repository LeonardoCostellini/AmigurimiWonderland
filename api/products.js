const { Pool } = require('@neondatabase/serverless')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})

module.exports = async (req, res) => {
  try {
    const result = await pool.query('SELECT 1')
    return res.json({ db: 'connected', result: result.rows })
  } catch (err) {
    console.error('DB CONNECT ERROR:', err)
    return res.status(500).json({ error: 'db error' })
  }
}
