# 🧪 GUIA DE TESTE - SISTEMA DE TEMAS COM CLERK

## 1. 🏠 LANDING PAGE (http://localhost:3000)
✅ Verificar se a página carrega normalmente
✅ Testar o seletor de temas no canto superior direito
✅ Confirmar que as cores mudam em tempo real
✅ Verificar se o tema é salvo no localStorage

## 2. 🔐 ACESSO ADMINISTRATIVO (http://localhost:3000/admin)
✅ Deve redirecionar para /sign-in automaticamente
✅ Verificar se o middleware está funcionando

## 3. 📝 PÁGINA DE LOGIN (http://localhost:3000/sign-in)
✅ Interface do Clerk deve aparecer
✅ Testar criação de conta ou login
✅ Verificar redirecionamento após login

## 4. ⚙️ PAINEL ADMIN (http://localhost:3000/admin)
✅ Deve mostrar o dashboard após login
✅ Testar mudança de temas
✅ Verificar se as mudanças aparecem na landing page
✅ Testar logout

## 5. 🎨 SISTEMA DE TEMAS
✅ Verde (padrão)
✅ Azul
✅ Roxo  
✅ Vermelho
✅ Rosa
✅ Laranja
✅ Ciano

## 6. 📱 RESPONSIVIDADE
✅ Desktop (1920px+)
✅ Tablet (768px - 1024px)
✅ Mobile (320px - 767px)

## 7. 🔄 PERSISTÊNCIA
✅ Tema salvo no localStorage
✅ Tema mantido após refresh
✅ Tema sincronizado entre abas
