const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = async function handler(req, res) {


  // ======================
  // LISTAR (GET)
  // ======================
  if (req.method === 'GET') {
    try {
      const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' }
      })

      return res.status(200).json(products)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Erro ao listar produtos' })
    }
  }

  // ======================
  // CRIAR (POST)
  // ======================
  if (req.method === 'POST') {
    try {
      const { name, description, price, images } = req.body

      if (!name || !price || !images || images.length === 0) {
        return res.status(400).json({
          error: 'Campos obrigatórios: name, price, images'
        })
      }

      const product = await prisma.product.create({
        data: {
          name,
          description,
          price: Number(price),
          images
        }
      })

      return res.status(201).json(product)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Erro ao criar produto' })
    }
  }

  // ======================
  // ATUALIZAR (PUT)
  // ======================
  if (req.method === 'PUT') {
    try {
      const { id } = req.query
      const { name, description, price, images } = req.body

      const product = await prisma.product.update({
        where: { id },
        data: {
          name,
          description,
          price: Number(price),
          images
        }
      })

      return res.status(200).json(product)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Erro ao atualizar produto' })
    }
  }

  // ======================
  // EXCLUIR (DELETE)
  // ======================
  if (req.method === 'DELETE') {
    const { id } = req.query

    try {
      await prisma.product.delete({
        where: { id }
      })

      return res.status(200).json({ success: true })
    } catch (err) {
      console.error(err)
      return res.status(500).json({
        error: 'Erro ao excluir produto'
      })
    }
  }

  // ======================
  // FALLBACK
  // ======================
  return res.status(405).json({ error: 'Method not allowed' })
}
