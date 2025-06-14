"use client"

import { useUser, UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import { useTheme } from "@/hooks/use-theme"
import { themes } from "@/lib/themes"
import { motion } from "framer-motion"
import {
  Palette,
  Monitor,
  Eye,
  Settings,
  Sparkles,
  Check,
  ExternalLink,
  Home,
  BarChart3,
  Clock,
  Activity,
  Database,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface AdminStats {
  totalThemeChanges: number
  recentLogs: Array<{
    id: string
    action: string
    details: any
    createdAt: string
  }>
  themeUsage: Array<{
    details: any
    _count: number
  }>
}

export default function AdminDashboard() {
  const { user, isLoaded } = useUser()
  const { currentTheme, setTheme, syncWithDatabase } = useTheme()
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [isLoadingStats, setIsLoadingStats] = useState(true)

  // Encontrar o tema atual nos dados dos temas
  const currentThemeData = themes.find((t) => t.id === currentTheme)

  // Carregar estatísticas
  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await fetch("/api/admin/stats")
        const data = await response.json()

        if (data.success) {
          setStats(data.stats)
        }
      } catch (error) {
        console.error("Erro ao carregar estatísticas:", error)
      } finally {
        setIsLoadingStats(false)
      }
    }

    if (isLoaded && user) {
      loadStats()
    }
  }, [isLoaded, user])

  const handleThemeChange = async (themeId: string) => {
    try {
      await setTheme(themeId as any)
      // Recarregar estatísticas após mudança
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error) {
      console.error("Erro ao alterar tema:", error)
    }
  }

  // Loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-gray-700 border-t-green-400 rounded-full animate-spin"></div>
          <p className="text-gray-400">Carregando painel administrativo...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header Melhorado */}
      <header className="bg-black/80 border-b border-gray-800 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <Settings className="h-6 w-6 text-black" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Painel Administrativo</h1>
                <p className="text-sm text-gray-400">Sistema de Gerenciamento de Temas</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Status do Banco */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-lg">
                <Database className="h-4 w-4 text-green-400" />
                <span className="text-xs text-gray-300">DB Conectado</span>
              </div>

              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-gray-300 hover:text-white"
              >
                <Home className="h-4 w-4" />
                <span className="text-sm">Landing Page</span>
                <ExternalLink className="h-3 w-3" />
              </Link>

              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10",
                      userButtonPopoverCard: "bg-gray-900 border border-gray-700",
                      userButtonPopoverActionButton: "text-gray-300 hover:text-white hover:bg-gray-800",
                    },
                  }}
                />
              </SignedIn>

              <SignedOut>
                <SignInButton>
                  <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-black font-medium rounded-lg transition-colors">
                    Fazer Login
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SignedIn>
          <div className="space-y-8">
            {/* Welcome Section Melhorada */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Sparkles className="h-8 w-8 text-black" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Bem-vindo, {user?.firstName || "Admin"}! 👋</h2>
                    <p className="text-gray-400 text-lg">Gerencie os temas da landing page em tempo real</p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="hidden lg:flex gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{stats?.totalThemeChanges || 0}</div>
                    <div className="text-xs text-gray-400">Mudanças</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{themes.length}</div>
                    <div className="text-xs text-gray-400">Temas</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Current Theme Status - Melhorado */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-2 bg-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Monitor className="h-6 w-6 text-green-400" />
                  <h3 className="text-xl font-semibold text-white">Tema Ativo</h3>
                  <div className="ml-auto flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-400">Sincronizado</span>
                  </div>
                </div>

                {currentThemeData && (
                  <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-gray-800 to-gray-750 rounded-xl border border-gray-600">
                    <div
                      className="w-16 h-16 rounded-2xl border-4 border-white/20 shadow-lg"
                      style={{ backgroundColor: currentThemeData.colors.primary }}
                    />
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-white mb-1">{currentThemeData.label}</h4>
                      <p className="text-gray-400 mb-3">{currentThemeData.description}</p>
                      <div className="flex gap-2">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: currentThemeData.colors.primary }} />
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: currentThemeData.colors.primaryDark }}
                        />
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: currentThemeData.colors.primaryLight }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-green-400">
                      <Check className="h-6 w-6" />
                      <span className="font-semibold">Ativo</span>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-6">
                  <BarChart3 className="h-6 w-6 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">Estatísticas</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Activity className="h-5 w-5 text-green-400" />
                      <span className="text-gray-300">Mudanças de Tema</span>
                    </div>
                    <span className="text-xl font-bold text-white">
                      {isLoadingStats ? "..." : stats?.totalThemeChanges || 0}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Palette className="h-5 w-5 text-purple-400" />
                      <span className="text-gray-300">Temas Disponíveis</span>
                    </div>
                    <span className="text-xl font-bold text-white">{themes.length}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-orange-400" />
                      <span className="text-gray-300">Última Atualização</span>
                    </div>
                    <span className="text-sm text-gray-400">Agora</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Theme Selector - Melhorado */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-900 rounded-xl p-8 border border-gray-700 shadow-lg"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Palette className="h-6 w-6 text-green-400" />
                  <h3 className="text-2xl font-semibold text-white">Selecionar Tema</h3>
                </div>
                <button
                  onClick={syncWithDatabase}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-gray-300"
                >
                  <Database className="h-4 w-4" />
                  <span className="text-sm">Sincronizar</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {themes.map((theme, index) => (
                  <motion.button
                    key={theme.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleThemeChange(theme.id)}
                    className={`relative p-6 rounded-2xl border-2 transition-all duration-300 group ${
                      currentTheme === theme.id
                        ? "border-green-400 bg-green-400/10 shadow-lg shadow-green-400/20"
                        : "border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-750 hover:shadow-lg"
                    }`}
                  >
                    {/* Theme Preview */}
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl border-2 border-white/20 shadow-lg group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: theme.colors.primary }}
                      />
                      <div className="text-left">
                        <h4 className="font-bold text-white text-lg">{theme.label}</h4>
                        <p className="text-xs text-gray-400">{theme.description}</p>
                      </div>
                    </div>

                    {/* Color Palette Preview */}
                    <div className="flex gap-2 mb-4">
                      <div className="w-6 h-6 rounded-lg" style={{ backgroundColor: theme.colors.primary }} />
                      <div className="w-6 h-6 rounded-lg" style={{ backgroundColor: theme.colors.primaryDark }} />
                      <div className="w-6 h-6 rounded-lg" style={{ backgroundColor: theme.colors.primaryLight }} />
                      <div className="w-6 h-6 rounded-lg bg-gray-700" />
                    </div>

                    {/* Active Indicator */}
                    {currentTheme === theme.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-3 right-3 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Check className="h-5 w-5 text-black" />
                      </motion.div>
                    )}

                    {/* Hover Effect */}
                    <div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-transparent to-transparent opacity-0 group-hover:opacity-20 transition-opacity"
                      style={{
                        background: `linear-gradient(135deg, ${theme.colors.primary}, transparent)`,
                      }}
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Instructions - Melhoradas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-900 rounded-xl p-8 border border-gray-700 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <Eye className="h-6 w-6 text-green-400" />
                <h3 className="text-2xl font-semibold text-white">Como Usar o Sistema</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white mb-4">Mudança de Temas</h4>
                  {[
                    "Selecione um tema clicando em qualquer card acima",
                    "O tema será aplicado instantaneamente em toda a landing page",
                    "As mudanças são salvas automaticamente no banco de dados",
                    "Todos os usuários verão a nova aparência imediatamente",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-400/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-bold text-green-400">{index + 1}</span>
                      </div>
                      <p className="text-gray-300">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white mb-4">Recursos Avançados</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                      <Shield className="h-5 w-5 text-blue-400" />
                      <span className="text-gray-300">Logs de auditoria automáticos</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                      <Database className="h-5 w-5 text-purple-400" />
                      <span className="text-gray-300">Sincronização com banco de dados</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-orange-400" />
                      <span className="text-gray-300">Estatísticas de uso em tempo real</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </SignedIn>

        <SignedOut>
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Settings className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Acesso Restrito</h2>
            <p className="text-gray-400 mb-8 text-lg">
              Você precisa estar logado para acessar o painel administrativo.
            </p>
            <SignInButton>
              <button className="px-8 py-4 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-xl transition-colors text-lg">
                Fazer Login
              </button>
            </SignInButton>
          </div>
        </SignedOut>
      </main>
    </div>
  )
}
