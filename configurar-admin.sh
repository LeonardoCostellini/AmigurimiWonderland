#!/bin/bash

echo "🔐 Configurador do Administrador - Amigurumi Wonderland"
echo "========================================================"
echo ""

# Verificar se está na pasta correta
if [ ! -f "api/setup-admin.js" ]; then
    echo "❌ Erro: Execute este script na pasta raiz do projeto!"
    exit 1
fi

echo "1️⃣  Instalando dependências..."
npm install

echo ""
echo "2️⃣  Configurando usuário administrador..."
cd api
node setup-admin.js

echo ""
echo "✅ Configuração concluída!"
echo ""
echo "======================================"
echo "📋 CREDENCIAIS DE ACESSO"
echo "======================================"
echo "📧 Email: admin@amigurimi.com"
echo "🔑 Senha: admin123"
echo ""
echo "🌐 Acesse o painel em:"
echo "   Produção: https://seu-projeto.vercel.app/login.html"
echo "   Local: http://localhost:4000/login.html"
echo ""
echo "⚠️  IMPORTANTE: Altere a senha após o primeiro acesso!"
echo "======================================"
