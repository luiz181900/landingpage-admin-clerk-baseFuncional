# 🐛 CHECKLIST DE DEBUG

## Se algo não funcionar:

### 🔑 PROBLEMAS COM CLERK:
1. Verificar se as chaves estão corretas no .env.local
2. Confirmar se o domínio está configurado no dashboard do Clerk
3. Verificar se não há espaços extras nas variáveis de ambiente

### 🎨 PROBLEMAS COM TEMAS:
1. Abrir DevTools (F12)
2. Verificar se as classes CSS estão sendo aplicadas
3. Confirmar se o localStorage está salvando o tema
4. Verificar se não há erros no console

### 🛡️ PROBLEMAS COM MIDDLEWARE:
1. Verificar se o middleware.ts está na raiz do projeto
2. Confirmar se as rotas estão sendo interceptadas
3. Verificar logs no terminal

### 🔄 PROBLEMAS DE HIDRATAÇÃO:
1. Verificar se há warnings de hidratação no console
2. Confirmar se o suppressHydrationWarning está funcionando
3. Verificar se o tema é aplicado após o carregamento

## 📊 COMANDOS ÚTEIS:
\`\`\`bash
# Limpar cache do Next.js
rm -rf .next

# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install

# Verificar variáveis de ambiente
echo $NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

# Build para produção
npm run build
