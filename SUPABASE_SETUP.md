# 🚀 CONFIGURAÇÃO COMPLETA DO SUPABASE

## 1. 📋 CRIAR PROJETO NO SUPABASE

### Passo 1: Acessar Supabase
1. Acesse: https://supabase.com
2. Clique em "Start your project"
3. Faça login com GitHub/Google
4. Clique em "New Project"

### Passo 2: Configurar Projeto
- **Nome**: `landing-page-themes`
- **Database Password**: Crie uma senha forte
- **Region**: Escolha a mais próxima (ex: South America)
- **Pricing Plan**: Free (suficiente para desenvolvimento)

## 2. 🔧 OBTER CREDENCIAIS

### No Dashboard do Supabase:
1. Vá em **Settings** → **Database**
2. Copie a **Connection String** (URI)
3. Vá em **Settings** → **API**
4. Copie as chaves:
   - `URL`
   - `anon/public key`
   - `service_role key`

### Exemplo de URLs:
\`\`\`
DATABASE_URL: postgresql://postgres.abc123:password@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL: postgresql://postgres.abc123:password@aws-0-us-west-1.pooler.supabase.com:5432/postgres
\`\`\`

## 3. 📝 EXECUTAR SCRIPT SQL

### No Supabase Dashboard:
1. Vá em **SQL Editor**
2. Clique em "New Query"
3. Cole todo o conteúdo do arquivo `SUPABASE_TABLES.sql`
4. Clique em "Run" (▶️)
5. Verifique se todas as tabelas foram criadas

### Verificar Criação:
\`\`\`sql
-- Execute esta query para verificar
SELECT 
    schemaname,
    tablename,
    tableowner
FROM pg_tables 
WHERE tablename IN ('site_configs', 'custom_themes', 'audit_logs', 'usage_stats', 'user_preferences')
ORDER BY tablename;
\`\`\`

## 4. ⚙️ CONFIGURAR .env.local

\`\`\`bash
# Copiar exemplo
cp .env.example .env.local

# Editar com suas credenciais do Supabase
nano .env.local
\`\`\`

### Exemplo de .env.local:
\`\`\`env
# CLERK
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# SUPABASE
DATABASE_URL="postgresql://postgres.abc123:sua-senha@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres.abc123:sua-senha@aws-0-us-west-1.pooler.supabase.com:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://abc123.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."
SUPABASE_SERVICE_ROLE_KEY="eyJ..."
\`\`\`

## 5. 🔄 CONFIGURAR PRISMA

\`\`\`bash
# Instalar dependências
npm install prisma @prisma/client

# Gerar cliente Prisma
npx prisma generate

# Verificar conexão (opcional)
npx prisma db pull
\`\`\`

## 6. 🧪 TESTAR CONEXÃO

\`\`\`bash
# Iniciar aplicação
npm run dev

# Verificar logs no terminal:
# ✅ Conexão com Supabase estabelecida
# ✅ Query de teste executada com sucesso
\`\`\`

## 7. 📊 VERIFICAR NO SUPABASE

### Table Editor:
1. Vá em **Table Editor**
2. Verifique se as 5 tabelas existem:
   - `site_configs`
   - `custom_themes` 
   - `audit_logs`
   - `usage_stats`
   - `user_preferences`

### Dados Iniciais:
1. Clique em `site_configs`
2. Verifique se existem 5 registros:
   - `active_theme: green`
   - `site_title: Marketing Mastery...`
   - `site_description: Aprenda a criar...`
   - `maintenance_mode: false`
   - `analytics_enabled: true`

## 8. 🔒 CONFIGURAR RLS (Row Level Security)

O script já configura automaticamente:
- ✅ Políticas de segurança
- ✅ Permissões por usuário
- ✅ Acesso público para leitura
- ✅ Escrita apenas para autenticados

## 9. 🚀 DEPLOY PARA PRODUÇÃO

### Vercel + Supabase:
1. **Vercel**: Conecte seu repositório
2. **Environment Variables**: Adicione todas as variáveis do .env.local
3. **Deploy**: Vercel fará o deploy automaticamente
4. **Supabase**: Já está configurado para produção

### Variáveis de Ambiente na Vercel:
\`\`\`
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
\`\`\`

## 10. 📈 MONITORAMENTO

### No Supabase Dashboard:
- **Logs**: Veja queries em tempo real
- **Database**: Monitor uso e performance
- **Auth**: Gerenciar usuários (futuro)
- **Storage**: Para uploads (futuro)

### Comandos Úteis:
\`\`\`bash
# Ver logs do Prisma
npm run dev -- --verbose

# Resetar banco (cuidado!)
npx prisma db push --force-reset

# Backup do banco
pg_dump $DATABASE_URL > backup.sql
\`\`\`

## ✅ CHECKLIST FINAL

- [ ] Projeto criado no Supabase
- [ ] Script SQL executado com sucesso
- [ ] 5 tabelas criadas
- [ ] Dados iniciais inseridos
- [ ] .env.local configurado
- [ ] Prisma conectando
- [ ] Aplicação rodando
- [ ] Admin panel funcionando
- [ ] Temas sendo salvos no banco
- [ ] Logs de auditoria funcionando

## 🆘 TROUBLESHOOTING

### Erro de Conexão:
- Verificar DATABASE_URL
- Verificar senha do banco
- Verificar região do Supabase

### Tabelas não existem:
- Re-executar script SQL
- Verificar permissões
- Verificar se o script rodou sem erros

### Prisma não conecta:
- Verificar DIRECT_URL
- Executar `npx prisma generate`
- Verificar logs no terminal
