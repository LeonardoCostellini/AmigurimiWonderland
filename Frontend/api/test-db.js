require('dotenv').config();
const pool = require('./db');

async function testDatabase() {
  try {
    console.log('🔄 Testando banco de dados...\n');
    
    // Verificar tabelas
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    
    console.log('📋 Tabelas disponíveis:');
    tables.rows.forEach(row => console.log(`   - ${row.table_name}`));
    
    // Verificar admins
    console.log('\n👤 Administradores cadastrados:');
    const admins = await pool.query('SELECT id, email FROM admins');
    admins.rows.forEach(admin => console.log(`   - ID: ${admin.id}, Email: ${admin.email}`));
    
    // Verificar categorias
    console.log('\n📁 Categorias cadastradas:');
    const categories = await pool.query('SELECT * FROM categories');
    if (categories.rows.length > 0) {
      categories.rows.forEach(cat => console.log(`   - ${cat.name}`));
    } else {
      console.log('   Nenhuma categoria cadastrada');
    }
    
    // Verificar produtos
    console.log('\n🧸 Produtos cadastrados:');
    const products = await pool.query('SELECT * FROM products');
    if (products.rows.length > 0) {
      products.rows.forEach(prod => console.log(`   - ${prod.name} - R$ ${prod.price}`));
    } else {
      console.log('   Nenhum produto cadastrado');
    }
    
    console.log('\n✅ Teste concluído!');
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await pool.end();
  }
}

testDatabase();
