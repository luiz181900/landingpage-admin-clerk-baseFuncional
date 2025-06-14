import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/database"

// GET - Obter estatísticas do admin
export async function GET() {
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

    // Buscar estatísticas
    const [totalThemeChanges, recentLogs, themeUsage] = await Promise.all([
      // Total de mudanças de tema
      prisma.auditLog.count({
        where: { action: "theme_changed" },
      }),

      // Logs recentes
      prisma.auditLog.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          action: true,
          details: true,
          createdAt: true,
        },
      }),

      // Uso de temas (últimos 30 dias)
      prisma.auditLog.groupBy({
        by: ["details"],
        where: {
          action: "theme_changed",
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
        },
        _count: true,
      }),
    ])

    return NextResponse.json({
      success: true,
      stats: {
        totalThemeChanges,
        recentLogs,
        themeUsage,
      },
    })
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}
