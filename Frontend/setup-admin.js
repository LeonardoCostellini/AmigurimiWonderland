require('dotenv').config();
const pool = require('./db');

async function criarAdminPadrao() {
  try {
    console.log('🔄 Conectando ao banco de dados Neon...');
    
    // Testar conexão
    await pool.query('SELECT NOW()');
    console.log('✅ Conexão com banco de dados estabelecida!');
    
    // Verificar se a tabela admins existe
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'admins'
      );
    `);
    
    if (!tableCheck.rows[0].exists) {
      console.log('⚠️  Tabela admins não existe. Criando...');
      await pool.query(`
        CREATE TABLE admins (
          id SERIAL PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL
        );
      `);
      console.log('✅ Tabela admins criada com sucesso!');
    }
    
    // Verificar se já existe um admin
    const { rows } = await pool.query('SELECT * FROM admins');
    
    if (rows.length > 0) {
      console.log('ℹ️  Administradores existentes no banco:');
      rows.forEach(admin => {
        console.log(`   - Email: ${admin.email}`);
      });
    } else {
      console.log('ℹ️  Nenhum administrador encontrado. Criando admin padrão...');
    }
    
    // Criar admin padrão
    const emailPadrao = 'admin@amigurimi.com';
    const senhaPadrao = 'admin123';
    
    // Verificar se o email já existe
    const existingAdmin = await pool.query(
      'SELECT * FROM admins WHERE email = $1',
      [emailPadrao]
    );
    
    if (existingAdmin.rows.length > 0) {
      console.log(`⚠️  Admin com email ${emailPadrao} já existe!`);
      console.log('   Atualizando senha...');
      await pool.query(
        'UPDATE admins SET password_hash = $1 WHERE email = $2',
        [senhaPadrao, emailPadrao]
      );
      console.log('✅ Senha atualizada com sucesso!');
    } else {
      await pool.query(
        'INSERT INTO admins (email, password_hash) VALUES ($1, $2)',
        [emailPadrao, senhaPadrao]
      );
      console.log('✅ Admin padrão criado com sucesso!');
    }
    
    console.log('\n📋 CREDENCIAIS DE ACESSO:');
    console.log('   Email: admin@amigurimi.com');
    console.log('   Senha: admin123');
    console.log('\n⚠️  IMPORTANTE: Altere essas credenciais após o primeiro acesso!\n');
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    await pool.end();
    console.log('🔌 Conexão com banco encerrada.');
  }
}

criarAdminPadrao();
