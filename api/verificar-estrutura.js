require('dotenv').config();
const pool = require('./db');

async function verificarEstrutura() {
  try {
    console.log('🔍 Verificando estrutura do banco de dados...\n');
    
    // Verificar tabela products
    const { rows } = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'products'
      ORDER BY ordinal_position;
    `);
    
    console.log('📋 COLUNAS DA TABELA PRODUCTS:');
    console.log('===============================');
    rows.forEach(col => {
      console.log(`   • ${col.column_name} (${col.data_type})`);
    });
    
    // Verificar tabela categories
    const { rows: catRows } = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'categories'
      ORDER BY ordinal_position;
    `);
    
    console.log('\n📋 COLUNAS DA TABELA CATEGORIES:');
    console.log('=================================');
    catRows.forEach(col => {
      console.log(`   • ${col.column_name} (${col.data_type})`);
    });
    
    // Verificar tabela admins
    const { rows: adminRows } = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'admins'
      ORDER BY ordinal_position;
    `);
    
    console.log('\n📋 COLUNAS DA TABELA ADMINS:');
    console.log('=============================');
    adminRows.forEach(col => {
      console.log(`   • ${col.column_name} (${col.data_type})`);
    });
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await pool.end();
  }
}

verificarEstrutura();
