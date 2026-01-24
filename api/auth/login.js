const { Pool } = require('@neondatabase/serverless')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email, password } = req.body || {}

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha obrigatórios' })
    }

    const { rows } = await pool.query(
      `
      SELECT id, email, password
      FROM admins
      WHERE email = $1
      LIMIT 1
      `,
      [email]
    )

    const admin = rows[0]

    if (!admin) {
      return res.status(401).json({ error: 'Credenciais inválidas' })
    }

    const validPassword = await bcrypt.compare(password, admin.password)

    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas' })
    }

    const token = jwt.sign(
      {
        id: admin.id,          // TEXT, ok
        email: admin.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    return res.status(200).json({ token })

  } catch (err) {
    console.error('LOGIN ERROR:', err)
    return res.status(500).json({ error: err.message })
  }
}
