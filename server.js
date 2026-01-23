const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()
const path = require('path')
app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))


app.use(cors())
app.use(express.json())

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body

  const admin = await prisma.admin.findUnique({
    where: { email }
  })

  if (!admin) {
    return res.status(401).json({ error: 'Credenciais inválidas' })
  }

  const valid = await bcrypt.compare(password, admin.password)

  if (!valid) {
    return res.status(401).json({ error: 'Credenciais inválidas' })
  }

  const token = jwt.sign(
    { id: admin.id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  )

  res.json({ token })
})

const productsRoutes = require('./api/products')

app.use('/api/products', productsRoutes)


app.listen(3000, () => {
  console.log('🚀 API rodando em http://localhost:3000')
})
