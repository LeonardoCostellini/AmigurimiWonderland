import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
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

    res.status(200).json({ token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro interno' })
  }
}
