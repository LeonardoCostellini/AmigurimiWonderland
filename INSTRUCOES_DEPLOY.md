# 🚀 Instruções de Deploy no Vercel

## Arquivos Corrigidos ✅

Este documento explica as correções feitas para resolver o erro 404 no `/api/auth`.

## 📝 Problema Identificado

O erro ocorria porque:
- O arquivo `vercel.json` estava vazio
- O Vercel não sabia como rotear as requisições da API
- A estrutura não estava configurada para Vercel Serverless Functions

## 🔧 Arquivos Alterados/Criados

### 1. **vercel.json** (CRIADO/ATUALIZADO)
- Configurado para usar `@vercel/node`
- Roteamento correto de `/api/*` para `api/index.js`
- Roteamento de arquivos estáticos do Frontend

### 2. **api/index.js** (ATUALIZADO)
- Adicionado `require('dotenv').config()`
- Exporta o app Express para o Vercel
- Mantém compatibilidade com desenvolvimento local

### 3. **api/routes/products.js** (CRIADO)
- Arquivo estava vazio
- Implementadas todas as rotas CRUD para produtos

### 4. **.env** (CRIADO NA RAIZ)
- Movido o DATABASE_URL para a raiz do projeto
- Mantém também o arquivo em `api/.env` para compatibilidade

## 🌐 Como Fazer Deploy no Vercel

### Opção 1: Via Dashboard Vercel (Recomendado)

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em "Add New" → "Project"
3. Importe seu repositório do GitHub
4. **IMPORTANTE**: Configure as variáveis de ambiente:
   - Vá em "Environment Variables"
   - Adicione: `DATABASE_URL` = `postgresql://neondb_owner:npg_J1PDbEmwOd5g@ep-green-feather-acc8919b-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require`
5. Clique em "Deploy"

### Opção 2: Via CLI Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Na pasta do projeto
cd AmigurimiWonderland

# Deploy
vercel

# Configurar variável de ambiente
vercel env add DATABASE_URL
# Cole o valor: postgresql://neondb_owner:npg_J1PDbEmwOd5g@ep-green-feather-acc8919b-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require

# Deploy em produção
vercel --prod
```

## ⚠️ IMPORTANTE: Configuração da Variável de Ambiente

**Não esqueça de adicionar a variável `DATABASE_URL` no painel do Vercel:**

1. Acesse seu projeto no dashboard do Vercel
2. Vá em "Settings" → "Environment Variables"
3. Adicione:
   - **Key**: `DATABASE_URL`
   - **Value**: `postgresql://neondb_owner:npg_J1PDbEmwOd5g@ep-green-feather-acc8919b-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require`
   - **Environment**: Production, Preview, Development (selecione todos)

## ✅ Testando Após Deploy

Após o deploy, teste as seguintes URLs:

- **Homepage**: `https://seu-projeto.vercel.app/`
- **Login Admin**: `https://seu-projeto.vercel.app/login.html`
- **API Health**: `https://seu-projeto.vercel.app/api`
- **API Auth**: `https://seu-projeto.vercel.app/api/auth` (POST)
- **API Products**: `https://seu-projeto.vercel.app/api/products` (GET)

## 🐛 Se ainda tiver erros

1. Verifique os logs no dashboard do Vercel
2. Confirme que a variável `DATABASE_URL` está configurada
3. Teste a conexão com o banco Neon
4. Verifique se as tabelas existem no banco de dados

## 📦 Estrutura Final do Projeto

```
AmigurimiWonderland/
├── api/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   └── categories.js
│   ├── db.js
│   ├── index.js (entry point para Vercel)
│   └── .env
├── Frontend/
│   ├── css/
│   ├── js/
│   ├── img/
│   ├── index.html
│   ├── login.html
│   └── dashboard.html
├── vercel.json (configuração Vercel)
├── .env (variáveis de ambiente)
└── package.json
```

## 🎉 Pronto!

Seu sistema agora deve funcionar corretamente no Vercel sem o erro 404 no `/api/auth`!
