#!/bin/bash

echo "🚀 Script de Deploy - Amigurimi Wonderland"
echo "=========================================="
echo ""

# Verificar se estamos no diretório correto
if [ ! -f "vercel.json" ]; then
    echo "❌ Erro: Execute este script na pasta AmigurimiWonderland!"
    exit 1
fi

echo "📋 Verificando status do Git..."
git status

echo ""
echo "➕ Adicionando todos os arquivos..."
git add .

echo ""
echo "💾 Criando commit..."
git commit -m "Fix: Correct API endpoints and serverless functions for Vercel

- Fixed /api/auth endpoint (was /auth)
- Updated app.js with correct API paths
- Added serverless functions for Vercel
- Improved error handling and debug
- Updated vercel.json configuration
- Added complete documentation"

echo ""
echo "📤 Enviando para GitHub..."
git push origin main

echo ""
echo "✅ Push concluído!"
echo ""
echo "⏳ Aguarde 1-2 minutos para o Vercel fazer o deploy automático"
echo ""
echo "🌐 Depois teste em:"
echo "   https://amigurimi-wonderland.vercel.app/login.html"
echo ""
echo "🔑 Credenciais:"
echo "   Email: admin@amigurimi.com"
echo "   Senha: admin123"
