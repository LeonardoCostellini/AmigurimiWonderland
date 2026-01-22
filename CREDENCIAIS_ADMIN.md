# 🔐 Credenciais de Acesso - Painel Admin

## 👤 Usuário Administrador Padrão

```
📧 Email: admin@amigurimi.com
🔑 Senha: admin123
```

---

## 🚀 Como Configurar o Admin no Banco de Dados

### Opção 1: Executar Script de Setup (Recomendado)

Execute o script que já está no projeto:

```bash
cd api
node setup-admin.js
```

Este script irá:
- ✅ Criar a tabela `admins` se não existir
- ✅ Criar o usuário admin padrão
- ✅ Se o admin já existir, atualizar a senha

**Saída esperada:**
```
🔄 Conectando ao banco de dados Neon...
✅ Conexão com banco de dados estabelecida!
✅ Admin padrão criado com sucesso!

📋 CREDENCIAIS DE ACESSO:
   Email: admin@amigurimi.com
   Senha: admin123

⚠️  IMPORTANTE: Altere essas credenciais após o primeiro acesso!
```

---

### Opção 2: Inserir Manualmente no Banco Neon

Acesse o console do [Neon](https://console.neon.tech/) e execute:

```sql
-- Criar a tabela admins se não existir
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);

-- Inserir admin padrão
INSERT INTO admins (email, password_hash) 
VALUES ('admin@amigurimi.com', 'admin123')
ON CONFLICT (email) DO UPDATE 
SET password_hash = 'admin123';
```

---

## 🌐 Acessando o Painel Admin

### Em Produção (Vercel):
```
https://seu-projeto.vercel.app/login.html
```

### Em Desenvolvimento Local:
```
http://localhost:4000/login.html
```

---

## ⚠️ IMPORTANTE: Segurança

### 1. **Altere a Senha Padrão**
A senha `admin123` é apenas para primeiro acesso. **MUDE IMEDIATAMENTE** após fazer login!

### 2. **Implementar Hash de Senha**
⚠️ **ATENÇÃO**: O sistema atual armazena senhas em **texto plano** (sem criptografia)!

Para produção, é **ESSENCIAL** implementar hash de senha. Recomendo usar `bcrypt`:

```bash
npm install bcrypt
```

**Exemplo de implementação:**
```javascript
const bcrypt = require('bcrypt');

// Criar hash ao cadastrar
const hash = await bcrypt.hash('senha123', 10);

// Verificar ao fazer login
const match = await bcrypt.compare('senha123', hash);
```

### 3. **Implementar JWT (JSON Web Tokens)**
Para autenticação segura, implemente JWT:

```bash
npm install jsonwebtoken
```

---

## 📝 Estrutura da Tabela Admins

```sql
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);
```

---

## 🔄 Adicionar Mais Administradores

Execute no console SQL do Neon:

```sql
INSERT INTO admins (email, password_hash) 
VALUES ('seu-email@exemplo.com', 'sua-senha');
```

---

## 🧪 Testar o Login

### Via cURL (Terminal):

```bash
curl -X POST https://seu-projeto.vercel.app/api/auth \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@amigurimi.com","password":"admin123"}'
```

**Resposta esperada (sucesso):**
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "admin": {
    "id": 1,
    "email": "admin@amigurimi.com"
  }
}
```

---

## ❓ Troubleshooting

### Erro: "Email ou senha inválidos"
- ✅ Verifique se o script `setup-admin.js` foi executado
- ✅ Confirme que a tabela `admins` existe no banco
- ✅ Verifique se o email e senha estão corretos

### Erro: "Erro interno do servidor"
- ✅ Verifique se a variável `DATABASE_URL` está configurada
- ✅ Teste a conexão com o banco Neon
- ✅ Verifique os logs no dashboard do Vercel

---

## 📞 Suporte

Se tiver problemas, execute o script de verificação:

```bash
cd api
node verificar-estrutura.js
```

Este script mostra:
- Status da conexão com o banco
- Tabelas existentes
- Usuários admin cadastrados
- Produtos e categorias
