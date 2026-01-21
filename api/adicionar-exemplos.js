require('dotenv').config();
const pool = require('./db');

async function adicionarDadosExemplo() {
  try {
    console.log('🔄 Conectando ao banco de dados...');
    
    // Testar conexão
    await pool.query('SELECT NOW()');
    console.log('✅ Conectado ao banco de dados!');
    console.log('');
    
    // Verificar se já existem categorias
    const { rows: existingCategories } = await pool.query('SELECT * FROM categories');
    
    if (existingCategories.length === 0) {
      console.log('📦 Criando categorias de exemplo...');
      
      await pool.query(`
        INSERT INTO categories (name, description) VALUES 
        ('Personagens BT21', 'Amigurumis inspirados nos personagens BT21'),
        ('Animais Fofos', 'Bichinhos de crochê adoráveis'),
        ('Personagens Disney', 'Personagens clássicos da Disney'),
        ('Frutas e Vegetais', 'Amigurumis de comidas kawaii')
      `);
      
      console.log('✅ 4 categorias criadas!');
    } else {
      console.log('ℹ️  Categorias já existem no banco.');
    }
    
    // Verificar se já existem produtos
    const { rows: existingProducts } = await pool.query('SELECT * FROM products');
    
    if (existingProducts.length === 0) {
      console.log('');
      console.log('🧸 Criando produtos de exemplo...');
      
      // Pegar ID da primeira categoria
      const { rows: categories } = await pool.query('SELECT id FROM categories LIMIT 1');
      const categoryId = categories[0].id;
      
      await pool.query(`
        INSERT INTO products (name, description, price, stock, image_url, category_id) VALUES 
        ('Tata BT21', 'Amigurumi do personagem Tata, feito à mão com linha de alta qualidade', 45.00, 5, 'https://via.placeholder.com/300', $1),
        ('Cooky BT21', 'Amigurumi do coelhinho Cooky, perfeito para presentear', 45.00, 3, 'https://via.placeholder.com/300', $1),
        ('Mang BT21', 'Amigurumi do cavalinho Mang, super fofo', 42.00, 8, 'https://via.placeholder.com/300', $1),
        ('Shooky BT21', 'Amigurumi do Shooky, com expressão divertida', 40.00, 6, 'https://via.placeholder.com/300', $1),
        ('RJ BT21', 'Amigurumi do RJ com capuz removível', 48.00, 4, 'https://via.placeholder.com/300', $1)
      `, [categoryId]);
      
      console.log('✅ 5 produtos criados!');
    } else {
      console.log('ℹ️  Produtos já existem no banco.');
    }
    
    // Mostrar resumo
    console.log('');
    console.log('📊 RESUMO DO BANCO DE DADOS:');
    console.log('============================');
    
    const { rows: allCategories } = await pool.query('SELECT COUNT(*) as total FROM categories');
    const { rows: allProducts } = await pool.query('SELECT COUNT(*) as total FROM products');
    const { rows: allAdmins } = await pool.query('SELECT COUNT(*) as total FROM admins');
    
    console.log(`   • Categorias: ${allCategories[0].total}`);
    console.log(`   • Produtos: ${allProducts[0].total}`);
    console.log(`   • Admins: ${allAdmins[0].total}`);
    console.log('');
    
    // Listar produtos
    const { rows: products } = await pool.query(`
      SELECT p.name, p.price, p.stock, c.name as category 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id
    `);
    
    if (products.length > 0) {
      console.log('🧸 PRODUTOS CADASTRADOS:');
      console.log('========================');
      products.forEach(p => {
        console.log(`   • ${p.name} - R$ ${p.price} (Estoque: ${p.stock}) - ${p.category || 'Sem categoria'}`);
      });
    }
    
    console.log('');
    console.log('✅ Dados de exemplo adicionados com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    await pool.end();
    console.log('🔌 Conexão com banco encerrada.');
  }
}

adicionarDadosExemplo();
