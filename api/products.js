const express = require('express')
const { PrismaClient } = require('@prisma/client')

const router = express.Router()
const prisma = new PrismaClient()

// LISTAR
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json(products)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar produtos' })
  }
})

// CRIAR
router.post('/', async (req, res) => {
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

    res.status(201).json(product)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao criar produto' })
  }
})

// ATUALIZAR
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
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

    res.json(product)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar produto' })
  }
})

// EXCLUIR PRODUTO
router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    await prisma.product.delete({
      where: { id }
    })

    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: 'Erro ao excluir produto'
    })
  }
})

module.exports = router
