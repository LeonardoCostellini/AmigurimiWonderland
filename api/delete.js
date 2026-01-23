const { PrismaClient } = require('@prisma/client')
const { auth } = require('../_middleware/auth')

const prisma = new PrismaClient()

module.exports = async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).end()
  }

  const user = auth(req)
  if (!user) {
    return res.status(401).end()
  }

  const { id } = req.query

  await prisma.product.delete({
    where: { id }
  })

  res.json({ ok: true })
}
