module.exports = async (req, res) => {
  try {
    res.status(200).json([
      {
        id: 1,
        name: "Amigurumi Teste",
        description: "Produto de teste",
        price: 99.9,
        imageUrl: "/img/favicon.png",
        images: ["/img/favicon.png"]
      }
    ])
  } catch (err) {
    console.error("API PRODUCTS ERROR:", err)
    res.status(500).json({ error: "Erro interno" })
  }
}
