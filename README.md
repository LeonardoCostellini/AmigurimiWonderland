# 🧶 Amigurimi Wonderland

Um sistema completo para loja de amigurumis com painel administrativo e catálogo online.

## 🌟 Funcionalidades

### 🛍️ Loja Online
- ✅ Catálogo de produtos com filtros por categoria
- ✅ Carrinho de compras funcional
- ✅ Modal de detalhes do produto
- ✅ Design responsivo e moderno
- ✅ Integração com WhatsApp para pedidos

### 🔐 Painel Administrativo
- ✅ Sistema de autenticação
- ✅ Gerenciamento de produtos (CRUD completo)
- ✅ Gerenciamento de categorias
- ✅ Dashboard com estatísticas

## 🚀 Credenciais de Acesso

### 👤 Usuário Admin Padrão
```
📧 Email: admin@amigurimi.com
🔑 Senha: admin123
```

⚠️ **IMPORTANTE**: Altere essas credenciais após o primeiro acesso!

📖 Veja mais detalhes em: [CREDENCIAIS_ADMIN.md](./CREDENCIAIS_ADMIN.md)

## 📁 Estrutura do Projeto

```
AmigurimiWonderland/
├── api/
│   ├── routes/
│   │   ├── auth.js         # Autenticação
│   │   ├── products.js     # CRUD de produtos
│   │   └── categories.js   # CRUD de categorias
│   ├── db.js               # Configuração PostgreSQL/Neon
│   ├── index.js            # Entry point (Vercel)
│   ├── setup-admin.js      # Script de setup admin
│   └── .env                # Variáveis de ambiente
├── Frontend/
│   ├── index.html          # Catálogo (página principal)
│   ├── login.html          # Login do admin
│   ├── dashboard.html      # Painel administrativo
│   ├── script.js           # JavaScript principal
│   ├── style.css           # Estilos globais
│   └── img/                # Imagens
├── vercel.json             # Configuração Vercel
├── package.json
└── README.md
```

## 🛠️ Tecnologias Utilizadas

- **Backend**: Node.js + Express
- **Banco de Dados**: PostgreSQL (Neon)
- **Frontend**: HTML + CSS + JavaScript Vanilla
- **Hospedagem**: Vercel
- **APIs**: REST

## ⚙️ Instalação Local

### 1. Clone o repositório
```bash
git clone <seu-repositorio>
cd AmigurimiWonderland
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie o arquivo `.env` na raiz com:
```env
DATABASE_URL=postgresql://neondb_owner:npg_J1PDbEmwOd5g@ep-green-feather-acc8919b-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require
```

### 4. Configure o banco de dados

Execute o script para criar o admin:
```bash
./configurar-admin.sh
```

Ou manualmente:
```bash
cd api
node setup-admin.js
```

### 5. Execute o servidor
```bash
cd api
node server-completo.js
```

O servidor estará rodando em: `http://localhost:4000`

## 🌐 Deploy no Vercel

### Passo a Passo Completo

1. **Configure a variável de ambiente no Vercel:**
   - Acesse: Settings → Environment Variables
   - Adicione:
     - **Key**: `DATABASE_URL`
     - **Value**: `postgresql://neondb_owner:npg_J1PDbEmwOd5g@ep-green-feather-acc8919b-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require`
     - **Environment**: Production, Preview, Development (todos)

2. **Faça o deploy:**
   - Via Dashboard: Import do GitHub → Deploy
   - Via CLI: `vercel --prod`

3. **Configure o banco de dados:**
   ```bash
   cd api
   node setup-admin.js
   ```

📖 Guia completo: [INSTRUCOES_DEPLOY.md](./INSTRUCOES_DEPLOY.md)

## 🗄️ Estrutura do Banco de Dados

### Tabela: admins
```sql
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);
```

### Tabela: categories
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Tabela: products
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock_info TEXT,
  image_url TEXT,
  category_id UUID REFERENCES categories(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 📚 Scripts Disponíveis

| Script | Comando | Descrição |
|--------|---------|-----------|
| Setup Admin | `node api/setup-admin.js` | Cria usuário admin padrão |
| Adicionar Exemplos | `node api/adicionar-exemplos.js` | Popula banco com dados de exemplo |
| Verificar Estrutura | `node api/verificar-estrutura.js` | Verifica status do banco |
| Configurar Admin | `./configurar-admin.sh` | Setup completo automatizado |
| Servidor Completo | `node api/server-completo.js` | Servidor com frontend estático |

## 🔐 Segurança

⚠️ **ATENÇÃO**: O sistema atual armazena senhas em **texto plano**!

### Melhorias Recomendadas:
1. **Implementar bcrypt** para hash de senhas
2. **Adicionar JWT** para autenticação
3. **Validação de inputs** no backend
4. **Rate limiting** para evitar brute force
5. **HTTPS** obrigatório em produção

## 🧪 Testando a API

### Health Check
```bash
curl https://seu-projeto.vercel.app/api
```

### Login
```bash
curl -X POST https://seu-projeto.vercel.app/api/auth \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@amigurimi.com","password":"admin123"}'
```

### Listar Produtos
```bash
curl https://seu-projeto.vercel.app/api/products
```

## 📋 Acessos

### Produção (Vercel)
- 🏠 **Homepage**: `https://seu-projeto.vercel.app/`
- 🔐 **Login Admin**: `https://seu-projeto.vercel.app/login.html`
- 📊 **Dashboard**: `https://seu-projeto.vercel.app/dashboard.html`

### Local
- 🏠 **Homepage**: `http://localhost:4000/`
- 🔐 **Login Admin**: `http://localhost:4000/login.html`
- 📊 **Dashboard**: `http://localhost:4000/dashboard.html`

## 📞 Suporte

- 📧 Email: contato@amigurumi.com.br
- 📱 WhatsApp: (43) 99914-9521
- 📍 Localização: Londrina (PR), Brasil

## 📝 Documentação Adicional

- [📖 Instruções de Deploy](./INSTRUCOES_DEPLOY.md)
- [🔐 Credenciais e Segurança](./CREDENCIAIS_ADMIN.md)
- [🔧 Relatório de Correções](./RELATORIO_CORRECOES.md)

## 🐛 Problemas Conhecidos

- ⚠️ Senhas em texto plano (implementar bcrypt)
- ⚠️ Sem validação de JWT
- ⚠️ Imagens usam placeholders (adicionar upload real)

## 🎯 Próximas Melhorias

- [ ] Sistema de upload de imagens
- [ ] Hash de senhas com bcrypt
- [ ] Autenticação JWT
- [ ] Painel de estatísticas avançado
- [ ] Sistema de pedidos completo
- [ ] Integração com gateway de pagamento
- [ ] Notificações por email

## 📄 Licença

Este projeto é privado e de uso exclusivo da Amigurumi Wonderland.

---

**Desenvolvido com ❤️ e 🧶**
