import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { setSiteConfig, createAuditLog } from "@/lib/database"

// POST - Alterar tema ativo (rota protegida)
export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "Não autorizado",
        },
        { status: 401 },
      )
    }

    // Obter dados da requisição
    const { theme } = await request.json()

    if (!theme) {
      return NextResponse.json(
        {
          success: false,
          error: "Tema não especificado",
        },
        { status: 400 },
      )
    }

    // Validar tema
    const validThemes = ["green", "blue", "purple", "red", "pink", "orange", "cyan"]
    if (!validThemes.includes(theme)) {
      return NextResponse.json(
        {
          success: false,
          error: "Tema inválido",
        },
        { status: 400 },
      )
    }

    // Salvar tema no banco de dados
    const success = await setSiteConfig("active_theme", theme)

    if (!success) {
      return NextResponse.json(
        {
          success: false,
          error: "Erro ao salvar tema",
        },
        { status: 500 },
      )
    }

    // Registrar log de auditoria
    await createAuditLog(
      userId,
      "theme_changed",
      { oldTheme: "unknown", newTheme: theme },
      request.ip,
      request.headers.get("user-agent"),
    )

    return NextResponse.json({
      success: true,
      message: "Tema alterado com sucesso",
      theme,
    })
  } catch (error) {
    console.error("Erro ao alterar tema:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}
