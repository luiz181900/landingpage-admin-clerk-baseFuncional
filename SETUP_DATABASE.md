# 🗄️ CONFIGURAÇÃO DO BANCO DE DADOS

## 1. 📋 PRÉ-REQUISITOS

### Opção A: PostgreSQL Local
\`\`\`bash
# Instalar PostgreSQL (Ubuntu/Debian)
sudo apt update
sudo apt install postgresql postgresql-contrib

# Instalar PostgreSQL (macOS com Homebrew)
brew install postgresql
brew services start postgresql

# Criar banco de dados
sudo -u postgres createdb landing_page_db
\`\`\`

### Opção B: PostgreSQL na Nuvem (Recomendado)
- **Supabase**: https://supabase.com (Grátis)
- **Railway**: https://railway.app (Grátis)
- **PlanetScale**: https://planetscale.com (MySQL)
- **Neon**: https://neon.tech (PostgreSQL)

## 2. ⚙️ CONFIGURAÇÃO

### 1. Instalar dependências
\`\`\`bash
npm install prisma @prisma/client
npm install -D tsx
\`\`\`

### 2. Configurar .env.local
\`\`\`bash
# Copiar exemplo
cp .env.example .env.local

# Editar com suas credenciais
DATABASE_URL="postgresql://username:password@localhost:5432/landing_page_db"
\`\`\`

### 3. Configurar Prisma
\`\`\`bash
# Gerar cliente Prisma
npm run db:generate

# Aplicar schema ao banco
npm run db:push

# Executar seed (dados iniciais)
npm run db:seed
\`\`\`

### 4. Verificar conexão
\`\`\`bash
# Abrir Prisma Studio (interface visual)
npm run db:studio
\`\`\`

## 3. 🚀 COMANDOS ÚTEIS

\`\`\`bash
# Desenvolvimento
npm run dev                 # Iniciar servidor
npm run db:studio          # Interface do banco
npm run db:generate        # Gerar cliente Prisma

# Produção
npm run build              # Build da aplicação
npm run db:migrate         # Aplicar migrações
npm start                  # Iniciar em produção

# Manutenção
npm run db:push            # Sincronizar schema
npm run db:seed            # Popular dados iniciais
\`\`\`

## 4. 🔍 VERIFICAÇÃO

### Verificar se tudo está funcionando:
1. ✅ Banco de dados conectado
2. ✅ Tabelas criadas (site_configs, custom_themes, audit_logs)
3. ✅ Dados iniciais inseridos
4. ✅ API endpoints respondendo
5. ✅ Painel admin funcionando

### Troubleshooting:
- **Erro de conexão**: Verificar DATABASE_URL
- **Tabelas não existem**: Executar `npm run db:push`
- **Dados não aparecem**: Executar `npm run db:seed`
- **Permissões**: Verificar usuário do banco
