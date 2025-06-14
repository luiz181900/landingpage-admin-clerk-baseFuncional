import { PrismaClient } from "@prisma/client"

// Singleton pattern para Prisma Client otimizado para Supabase
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

// Função para verificar conexão com Supabase
export async function checkDatabaseConnection() {
  try {
    await prisma.$connect()
    console.log("✅ Conexão com Supabase estabelecida")

    // Testar uma query simples
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log("✅ Query de teste executada com sucesso")

    return true
  } catch (error) {
    console.error("❌ Erro ao conectar com Supabase:", error)
    return false
  }
}

// Função para desconectar do banco
export async function disconnectDatabase() {
  await prisma.$disconnect()
}

// Funções utilitárias para configurações do site (otimizadas para Supabase)
export async function getSiteConfig(key: string): Promise<string | null> {
  try {
    // Usar função SQL personalizada para melhor performance
    const result = await prisma.$queryRaw<Array<{ get_site_config: string }>>`
      SELECT get_site_config(${key}) as get_site_config
    `

    return result[0]?.get_site_config || null
  } catch (error) {
   console.error(`Erro ao buscar configuração ${key}:`, error);


    // Fallback para query normal
    try {
      const config = await prisma.siteConfig.findUnique({
        where: { key },
      })
      return config?.value || null
    } catch (fallbackError) {
      console.error(`Erro no fallback para ${key}:`, fallbackError)
      return null
    }
  }
}

export async function setSiteConfig(key: string, value: string): Promise<boolean> {
  try {
    // Usar função SQL personalizada para melhor performance
    const result = await prisma.$queryRaw<Array<{ set_site_config: boolean }>>`
      SELECT set_site_config(${key}, ${value}) as set_site_config
    `

    return result[0]?.set_site_config || false
  } catch (error) {
    console.error(`Erro ao salvar configuração ${key}:`, error)

    // Fallback para upsert normal
    try {
      await prisma.siteConfig.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      })
      return true
    } catch (fallbackError) {
      console.error(`Erro no fallback para ${key}:`, fallbackError)
      return false
    }
  }
}

// Função para registrar logs de auditoria (otimizada para Supabase)
export async function createAuditLog(
  userId: string,
  action: string,
  details?: any,
  ipAddress?: string,
  userAgent?: string,
) {
  try {
    // Usar função SQL personalizada
    await prisma.$queryRaw`
      SELECT create_audit_log(
        ${userId}, 
        ${action}, 
        ${details ? JSON.stringify(details) : null}::jsonb,
        ${ipAddress},
        ${userAgent}
      )
    `
  } catch (error) {
    console.error("Erro ao criar log de auditoria:", error)

    // Fallback para insert normal
    try {
      await prisma.auditLog.create({
        data: {
          userId,
          action,
          details: details ? JSON.stringify(details) : null,
          ipAddress,
          userAgent,
        },
      })
    } catch (fallbackError) {
      console.error("Erro no fallback do log de auditoria:", fallbackError)
    }
  }
}

// Função para obter estatísticas (otimizada para Supabase)
export async function getSystemStats() {
  try {
    // Usar view personalizada para melhor performance
    const summary = await prisma.$queryRaw<
      Array<{
        total_theme_changes: number
        unique_users: number
        last_activity: Date
      }>
    >`
      SELECT * FROM stats_summary
    `

    const popularThemes = await prisma.$queryRaw<
      Array<{
        theme_name: string
        usage_count: number
        last_used: Date
      }>
    >`
      SELECT * FROM popular_themes LIMIT 10
    `

    return {
      summary: summary[0] || { total_theme_changes: 0, unique_users: 0, last_activity: new Date() },
      popularThemes: popularThemes || [],
    }
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error)

    // Fallback para queries normais
    try {
      const totalThemeChanges = await prisma.auditLog.count({
        where: { action: "theme_changed" },
      })

      const uniqueUsers = await prisma.auditLog.findMany({
        where: { action: "theme_changed" },
        distinct: ["userId"],
        select: { userId: true },
      })

      return {
        summary: {
          total_theme_changes: totalThemeChanges,
          unique_users: uniqueUsers.length,
          last_activity: new Date(),
        },
        popularThemes: [],
      }
    } catch (fallbackError) {
      console.error("Erro no fallback das estatísticas:", fallbackError)
      return {
        summary: { total_theme_changes: 0, unique_users: 0, last_activity: new Date() },
        popularThemes: [],
      }
    }
  }
}

// Função para gerenciar preferências do usuário
export async function getUserPreferences(userId: string) {
  try {
    const preferences = await prisma.userPreferences.findUnique({
      where: { userId },
    })

    return preferences
  } catch (error) {
    console.error("Erro ao buscar preferências do usuário:", error)
    return null
  }
}

export async function setUserPreferences(
  userId: string,
  preferences: {
    preferredTheme?: string
    emailNotifications?: boolean
  },
) {
  try {
    const result = await prisma.userPreferences.upsert({
      where: { userId },
      update: {
        ...preferences,
        lastLoginAt: new Date(),
      },
      create: {
        userId,
        ...preferences,
        lastLoginAt: new Date(),
      },
    })

    return result
  } catch (error) {
    console.error("Erro ao salvar preferências do usuário:", error)
    return null
  }
}
