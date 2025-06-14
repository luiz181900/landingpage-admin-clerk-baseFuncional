import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

// 🔓 Rotas públicas (acessíveis sem login)
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/public(.*)",
  "/api/themes/current",
])

// 🔐 Rotas protegidas
const isProtectedRoute = createRouteMatcher([
  "/admin(.*)",
  "/dashboard(.*)",
  "/api/admin(.*)",
])

export default clerkMiddleware(async (auth, req) => {
  try {
    // ✅ Verificar se req.nextUrl está definido
    const pathname = req?.nextUrl?.pathname || "/"

    // ✅ Permitir acesso se for rota pública
    if (isPublicRoute(req)) {
      return NextResponse.next()
    }

    // 🔐 Proteger rota se for protegida
    if (isProtectedRoute(req)) {
      const { userId } = await auth()
      if (!userId) {
        const signInUrl = new URL("/sign-in", req.url)
        signInUrl.searchParams.set("redirect_url", pathname)
        return NextResponse.redirect(signInUrl)
      }
    }

    // ✅ Seguir normalmente
    return NextResponse.next()

  } catch (error) {
    console.error("Erro no middleware de autenticação:", error)

    const errorUrl = new URL("/sign-in", req.url)
    errorUrl.searchParams.set("error", "auth_error")
    return NextResponse.redirect(errorUrl)
  }
})

export const config = {
  matcher: [
    // ⛔ Ignora arquivos estáticos e internos do Next
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // ✅ Sempre aplicar em rotas API
    "/(api|trpc)(.*)",
  ],
}
