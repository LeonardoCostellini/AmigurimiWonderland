const { PrismaClient } = require('@prisma/client')

// ======================
// PRISMA SINGLETON (Vercel Safe)
// ======================
let prisma

if (!global.prisma) {
  global.prisma = new PrismaClient()
}

prisma = global.prisma

module.exports = async function handler(req, res) {
  try {
    // ======================
    // LISTAR (GET)
    // ======================
    if (req.method === 'GET') {
      const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' }
      })

      return res.status(200).json(products)
    }

    // ======================
    // CRIAR (POST)
    // ======================
    if (req.method === 'POST') {
      const { name, description, price, images } = req.body || {}

      if (!name || !price || !Array.isArray(images) || images.length === 0) {
        return res.status(400).json({
          error: 'Campos obrigatórios: name, price, images[]'
        })
      }

      const product = await prisma.product.create({
        data: {
          name,
          description: description || '',
          price: Number(price),
          images
        }
      })

      return res.status(201).json(product)
    }

    // ======================
    // ATUALIZAR (PUT)
    // ======================
    if (req.method === 'PUT') {
      const { id } = req.query
      const { name, description, price, images } = req.body || {}

      if (!id) {
        return res.status(400).json({ error: 'ID é obrigatório' })
      }

      const product = await prisma.product.update({
        where: { id: Number(id) },
        data: {
          name,
          description,
          price: price !== undefined ? Number(price) : undefined,
          images
        }
      })

      return res.status(200).json(product)
    }

    // ======================
    // EXCLUIR (DELETE)
    // ======================
    if (req.method === 'DELETE') {
      const { id } = req.query

      if (!id) {
        return res.status(400).json({ error: 'ID é obrigatório' })
      }

      await prisma.product.delete({
        where: { id: Number(id) }
      })

      return res.status(200).json({ success: true })
    }

    // ======================
    // FALLBACK
    // ======================
    return res.status(405).json({ error: 'Method not allowed' })

  } catch (err) {
    console.error('PRODUCT API ERROR:', err)
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}
