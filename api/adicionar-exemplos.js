require('dotenv').config();
const pool = require('./db');
const { v4: uuidv4 } = require('uuid');

async function adicionarDadosExemplo() {
  try {
    console.log('🔄 Conectando ao banco de dados...');
    
    // Testar conexão
    await pool.query('SELECT NOW()');
    console.log('✅ Conectado ao banco de dados!');
    console.log('');
    
    // Verificar se já existem categorias
    const { rows: existingCategories } = await pool.query('SELECT * FROM categories');
    
    if (existingCategories.length <= 1) {
      console.log('📦 Criando categorias de exemplo...');
      
      // Criar categorias com UUID
      await pool.query(`
        INSERT INTO categories (id, name, description) VALUES 
        ($1, 'Animais Fofos', 'Bichinhos de crochê adoráveis'),
        ($2, 'Personagens Disney', 'Personagens clássicos da Disney'),
        ($3, 'Frutas e Vegetais', 'Amigurumis de comidas kawaii')
      `, [uuidv4(), uuidv4(), uuidv4()]);
      
      console.log('✅ Categorias adicionais criadas!');
    } else {
      console.log('ℹ️  Categorias já existem no banco.');
    }
    
    // Pegar todas as categorias
    const { rows: categories } = await pool.query('SELECT * FROM categories LIMIT 1');
    
    if (categories.length === 0) {
      console.log('⚠️  Nenhuma categoria encontrada. Criando categoria padrão...');
      await pool.query(`
        INSERT INTO categories (id, name, description) VALUES 
        ($1, 'Personagens BT21', 'Amigurumis inspirados nos personagens BT21')
      `, [uuidv4()]);
      const { rows: newCat } = await pool.query('SELECT * FROM categories LIMIT 1');
      categories.push(newCat[0]);
    }
    
    const categoryId = categories[0].id;
    
    // Verificar se já existem produtos
    const { rows: existingProducts } = await pool.query('SELECT * FROM products');
    
    if (existingProducts.length === 0) {
      console.log('');
      console.log('🧸 Criando produtos de exemplo...');
      
      // Criar produtos com UUID
      await pool.query(`
        INSERT INTO products (id, name, description, price, stock_info, image_url, category_id) VALUES 
        ($1, 'Tata BT21', 'Amigurumi do personagem Tata, feito à mão com linha de alta qualidade', 45.00, '5 unidades', 'https://via.placeholder.com/300', $7),
        ($2, 'Cooky BT21', 'Amigurumi do coelhinho Cooky, perfeito para presentear', 45.00, '3 unidades', 'https://via.placeholder.com/300', $7),
        ($3, 'Mang BT21', 'Amigurumi do cavalinho Mang, super fofo', 42.00, '8 unidades', 'https://via.placeholder.com/300', $7),
        ($4, 'Shooky BT21', 'Amigurumi do Shooky, com expressão divertida', 40.00, '6 unidades', 'https://via.placeholder.com/300', $7),
        ($5, 'RJ BT21', 'Amigurumi do RJ com capuz removível', 48.00, '4 unidades', 'https://via.placeholder.com/300', $7),
        ($6, 'Koya BT21', 'Amigurumi do Koya dorminhoco', 43.00, '7 unidades', 'https://via.placeholder.com/300', $7)
      `, [uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), categoryId]);
      
      console.log('✅ 6 produtos criados!');
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
      SELECT p.name, p.price, p.stock_info, c.name as category 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
    `);
    
    if (products.length > 0) {
      console.log('🧸 PRODUTOS CADASTRADOS:');
      console.log('========================');
      products.forEach(p => {
        console.log(`   • ${p.name} - R$ ${p.price} (${p.stock_info}) - ${p.category || 'Sem categoria'}`);
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
