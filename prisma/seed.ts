import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Iniciando seed do banco de dados...")

  // Configurações iniciais do site
  await prisma.siteConfig.upsert({
    where: { key: "active_theme" },
    update: {},
    create: {
      key: "active_theme",
      value: "green",
    },
  })

  await prisma.siteConfig.upsert({
    where: { key: "site_title" },
    update: {},
    create: {
      key: "site_title",
      value: "Marketing Mastery - 1K por dia",
    },
  })

  await prisma.siteConfig.upsert({
    where: { key: "site_description" },
    update: {},
    create: {
      key: "site_description",
      value: "Aprenda a criar e vender produtos digitais low ticket",
    },
  })

  console.log("✅ Seed concluído com sucesso!")
}

main()
  .catch((e) => {
    console.error("❌ Erro durante o seed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
