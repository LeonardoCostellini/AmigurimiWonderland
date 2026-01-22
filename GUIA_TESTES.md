# 🧪 Guia de Testes - Funções Serverless Otimizadas

## ✅ Checklist de Validação

Após o deploy, teste cada endpoint para garantir que tudo está funcionando:

---

## 1️⃣ Health Check

**Endpoint:** `GET /api`

```bash
curl https://seu-projeto.vercel.app/api
```

**Resposta Esperada:**
```json
{
  "message": "API Amigurimi Wonderland está funcionando!",
  "status": "online",
  "timestamp": "2025-01-22T23:20:00.000Z",
  "endpoints": [...]
}
```

✅ **Status esperado:** `200 OK`

---

## 2️⃣ Autenticação (Login)

**Endpoint:** `POST /api/auth`

```bash
curl -X POST https://seu-projeto.vercel.app/api/auth \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@amigurimi.com","password":"admin123"}'
```

**Resposta Esperada:**
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

✅ **Status esperado:** `200 OK`

---

## 3️⃣ Listar Produtos

**Endpoint:** `GET /api/products`

```bash
curl https://seu-projeto.vercel.app/api/products
```

**Resposta Esperada:**
```json
[
  {
    "id": 1,
    "name": "Baby Koya",
    "description": "...",
    "price": "85.00",
    "category_id": 1,
    "image_url": "...",
    "stock_info": "...",
    "created_at": "..."
  }
]
```

✅ **Status esperado:** `200 OK`

---

## 4️⃣ Listar Categorias

**Endpoint:** `GET /api/categories`

```bash
curl https://seu-projeto.vercel.app/api/categories
```

**Resposta Esperada:**
```json
[
  {
    "id": 1,
    "name": "Personagens BT21",
    "description": "..."
  }
]
```

✅ **Status esperado:** `200 OK`

---

## 5️⃣ Criar Produto (Autenticado)

**Endpoint:** `POST /api/products`

```bash
curl -X POST https://seu-projeto.vercel.app/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste Produto",
    "description": "Produto de teste",
    "price": 99.90,
    "category_id": 1,
    "image_url": "https://exemplo.com/imagem.jpg",
    "stock_info": "Sob encomenda"
  }'
```

✅ **Status esperado:** `201 Created`

---

## 6️⃣ Teste da Interface

### Login Page
1. Acesse: `https://seu-projeto.vercel.app/login.html`
2. Use as credenciais:
   - **Email:** admin@amigurimi.com
   - **Senha:** admin123
3. Verifique se redireciona para `/dashboard.html`

### Dashboard
1. Clique em "Produtos"
2. Verifique se os produtos são carregados
3. Clique em "Categorias"
4. Verifique se as categorias são carregadas

### Homepage
1. Acesse: `https://seu-projeto.vercel.app/`
2. Verifique se os produtos estão sendo exibidos
3. Teste o filtro de categorias
4. Adicione um produto ao carrinho
5. Finalize um pedido (deve abrir WhatsApp)

---

## 🔍 Verificação de Funções Serverless

### No Painel do Vercel:

1. Acesse: `https://vercel.com/seu-usuario/seu-projeto/settings/functions`
2. Verifique que apenas **2 funções** estão listadas:
   - ✅ `api/admin.js`
   - ✅ `api/index.js`

Se aparecer mais de 2, verifique o `vercel.json`!

---

## 🐛 Troubleshooting

### Problema: "500 Internal Server Error"
**Causa:** Variável `DATABASE_URL` não configurada

**Solução:**
```bash
vercel env add DATABASE_URL
# Cole sua connection string do PostgreSQL/Neon
vercel --prod
```

---

### Problema: "404 Not Found" nas rotas da API
**Causa:** Arquivo `vercel.json` desatualizado

**Solução:**
1. Verifique se `vercel.json` está apontando para `admin.js`
2. Faça um novo deploy: `vercel --prod`

---

### Problema: Login não funciona
**Causa:** Admin não foi criado no banco

**Solução:**
```bash
# Local
node scripts/setup-admin.js

# Ou via Vercel CLI
vercel dev
node scripts/setup-admin.js
```

---

## ✅ Tudo Funcionando?

Se todos os testes passaram, parabéns! 🎉

Sua aplicação está:
- ✅ Otimizada com apenas 2 funções serverless
- ✅ Compatível com Vercel Hobby (limite de 12)
- ✅ Funcionando perfeitamente
- ✅ Pronta para produção!

---

## 📊 Logs e Monitoramento

Para ver os logs em tempo real:

```bash
vercel logs seu-projeto.vercel.app
```

Ou acesse: `https://vercel.com/seu-usuario/seu-projeto/logs`

---

## 🚀 Próximos Passos

1. ✅ Alterar senha padrão do admin
2. ✅ Adicionar produtos reais
3. ✅ Adicionar categorias reais
4. ✅ Configurar domínio customizado
5. ✅ Monitorar uso e performance

Pronto! Seu sistema está otimizado e funcionando! 🎊
