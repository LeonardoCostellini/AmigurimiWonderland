// Health check endpoint
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  return res.status(200).json({
    message: 'API Amigurimi Wonderland está funcionando!',
    status: 'online',
    timestamp: new Date().toISOString(),
    endpoints: [
      'POST /api/auth - Autenticação',
      'GET /api/products - Listar produtos',
      'POST /api/products - Criar produto',
      'PUT /api/products/:id - Atualizar produto',
      'DELETE /api/products/:id - Deletar produto',
      'GET /api/categories - Listar categorias',
      'POST /api/categories - Criar categoria'
    ]
  });
};
