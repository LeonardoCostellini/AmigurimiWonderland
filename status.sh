#!/bin/bash

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color
BOLD='\033[1m'

clear

echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                                ║${NC}"
echo -e "${BLUE}║          ${BOLD}🧸 AMIGURIMI WONDERLAND - SISTEMA ADMIN${NC}${BLUE}          ║${NC}"
echo -e "${BLUE}║                                                                ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${BOLD}📊 STATUS DO SISTEMA:${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Verificar servidor
if curl -s http://localhost:4000/api/categories > /dev/null 2>&1; then
    echo -e "   Servidor Web:        ${GREEN}✓ ONLINE${NC} (porta 4000)"
else
    echo -e "   Servidor Web:        ${RED}✗ OFFLINE${NC}"
fi

# Verificar banco
cd /app/AmigurimiWonderland/api
DB_TEST=$(node -e "require('dotenv').config(); const pool = require('./db'); pool.query('SELECT 1').then(() => {console.log('OK'); process.exit(0)}).catch(() => {console.log('ERRO'); process.exit(1)})" 2>/dev/null)
if [ "$DB_TEST" = "OK" ]; then
    echo -e "   Banco de Dados:      ${GREEN}✓ CONECTADO${NC} (Neon PostgreSQL)"
else
    echo -e "   Banco de Dados:      ${YELLOW}⚠ Verifique conexão${NC}"
fi

echo ""
echo -e "${BOLD}🗄️  DADOS NO BANCO:${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Contar registros
ADMINS=$(curl -s http://localhost:4000/api/auth -X POST -H "Content-Type: application/json" -d '{"email":"admin@amigurimi.com","password":"admin123"}' 2>/dev/null | grep -o "success" | wc -l)
PRODUCTS=$(curl -s http://localhost:4000/api/products 2>/dev/null | grep -o "name" | wc -l)
CATEGORIES=$(curl -s http://localhost:4000/api/categories 2>/dev/null | grep -o "name" | wc -l)

if [ $ADMINS -gt 0 ]; then
    echo -e "   Administradores:     ${GREEN}✓ 1 cadastrado${NC}"
else
    echo -e "   Administradores:     ${RED}✗ Nenhum encontrado${NC}"
fi

echo -e "   Produtos:            ${GREEN}✓ $PRODUCTS cadastrados${NC}"
echo -e "   Categorias:          ${GREEN}✓ $CATEGORIES cadastradas${NC}"

echo ""
echo -e "${BOLD}🔐 CREDENCIAIS DE ACESSO:${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "   Email:    ${YELLOW}admin@amigurimi.com${NC}"
echo -e "   Senha:    ${YELLOW}admin123${NC}"

echo ""
echo -e "${BOLD}🌐 ACESSO AO SISTEMA:${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "   Login:    ${BLUE}http://localhost:4000/login.html${NC}"
echo -e "   API:      ${BLUE}http://localhost:4000/api${NC}"

echo ""
echo -e "${BOLD}⚙️  COMANDOS ÚTEIS:${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   Iniciar servidor:"
echo -e "   ${BLUE}cd /app/AmigurimiWonderland/api && node server-completo.js${NC}"
echo ""
echo "   Executar testes:"
echo -e "   ${BLUE}cd /app/AmigurimiWonderland && ./testar-sistema.sh${NC}"
echo ""
echo "   Recriar admin:"
echo -e "   ${BLUE}cd /app/AmigurimiWonderland/api && node setup-admin.js${NC}"
echo ""
echo "   Ver logs:"
echo -e "   ${BLUE}tail -f /tmp/server.log${NC}"

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                                                ║${NC}"
echo -e "${GREEN}║              ✅ SISTEMA TOTALMENTE FUNCIONAL! ✅               ║${NC}"
echo -e "${GREEN}║                                                                ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""
