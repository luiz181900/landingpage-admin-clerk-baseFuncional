import { NextResponse } from "next/server"
import { getSiteConfig } from "@/lib/database"

// GET - Obter tema atual (rota pública)
export async function GET() {
  try {
    const activeTheme = await getSiteConfig("active_theme")

    return NextResponse.json({
      success: true,
      theme: activeTheme || "green", // fallback para verde
    })
  } catch (error) {
    console.error("Erro ao buscar tema atual:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Erro interno do servidor",
        theme: "green", // fallback
      },
      { status: 500 },
    )
  }
}
