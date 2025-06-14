# 🎯 COMPORTAMENTO ESPERADO

## 1. 🚀 INICIALIZAÇÃO (0-3 segundos)
- Loading screen com spinner temático
- Carregamento das configurações do Clerk
- Aplicação do tema salvo (ou verde padrão)
- Renderização da landing page

## 2. 🎨 MUDANÇA DE TEMA (Instantânea)
- Clique no seletor de temas
- Dropdown com 7 opções de cores
- Mudança imediata em toda a página
- Salvamento automático no localStorage
- Transições suaves (300ms)

## 3. 🔐 FLUXO DE AUTENTICAÇÃO
### Usuário NÃO logado:
- /admin → Redirect para /sign-in
- Interface do Clerk aparece
- Opções de login/cadastro

### Usuário LOGADO:
- /admin → Dashboard administrativo
- Informações do usuário
- Controles de tema
- Botão de logout

## 4. 📱 RESPONSIVIDADE
### Desktop (1920px+):
- Layout em 3 colunas no grid de temas
- Sidebar completa
- Todos os elementos visíveis

### Tablet (768px-1024px):
- Layout em 2 colunas
- Menu colapsável
- Textos adaptados

### Mobile (320px-767px):
- Layout em 1 coluna
- Menu hambúrguer
- Botões maiores para touch

## 5. ⚡ PERFORMANCE
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms

## 6. 🔄 SINCRONIZAÇÃO
- Mudanças no admin refletem na landing page
- Múltiplas abas sincronizadas
- Estado persistente após refresh
- Fallback para tema padrão em caso de erro
