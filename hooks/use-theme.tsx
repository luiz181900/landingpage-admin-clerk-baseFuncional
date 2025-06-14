"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

// Tipos para o sistema de temas
export type ThemeName = "green" | "blue" | "purple" | "red" | "pink" | "orange" | "cyan"

export interface Theme {
  name: ThemeName
  label: string
  primaryColor: string
  description: string
}

// Definição dos temas disponíveis
export const themes: Theme[] = [
  {
    name: "green",
    label: "Verde",
    primaryColor: "rgb(34, 197, 94)",
    description: "Tema padrão com cores verdes vibrantes",
  },
  {
    name: "blue",
    label: "Azul",
    primaryColor: "rgb(59, 130, 246)",
    description: "Tema profissional com tons de azul",
  },
  {
    name: "purple",
    label: "Roxo",
    primaryColor: "rgb(147, 51, 234)",
    description: "Tema criativo com cores roxas",
  },
  {
    name: "red",
    label: "Vermelho",
    primaryColor: "rgb(239, 68, 68)",
    description: "Tema energético com tons vermelhos",
  },
  {
    name: "pink",
    label: "Rosa",
    primaryColor: "rgb(236, 72, 153)",
    description: "Tema moderno com cores rosas",
  },
  {
    name: "orange",
    label: "Laranja",
    primaryColor: "rgb(249, 115, 22)",
    description: "Tema caloroso com tons laranja",
  },
  {
    name: "cyan",
    label: "Ciano",
    primaryColor: "rgb(6, 182, 212)",
    description: "Tema fresco com cores ciano",
  },
]

interface ThemeContextType {
  currentTheme: ThemeName
  setTheme: (theme: ThemeName) => Promise<void>
  themes: Theme[]
  isLoading: boolean
  syncWithDatabase: () => Promise<void>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>("green")
  const [isLoading, setIsLoading] = useState(true)

  // Sincronizar com o banco de dados
  const syncWithDatabase = async () => {
    try {
      const response = await fetch("/api/themes/current")
      const data = await response.json()

      if (data.success && data.theme) {
        const dbTheme = data.theme as ThemeName
        if (themes.find((t) => t.name === dbTheme)) {
          setCurrentTheme(dbTheme)
          localStorage.setItem("theme", dbTheme)
        }
      }
    } catch (error) {
      console.error("Erro ao sincronizar tema com banco:", error)
      // Fallback para localStorage
      const savedTheme = localStorage.getItem("theme") as ThemeName
      if (savedTheme && themes.find((t) => t.name === savedTheme)) {
        setCurrentTheme(savedTheme)
      }
    }
  }

  // Carregar tema na inicialização
  useEffect(() => {
    const loadTheme = async () => {
      setIsLoading(true)

      // Primeiro tentar carregar do localStorage para resposta rápida
      const savedTheme = localStorage.getItem("theme") as ThemeName
      if (savedTheme && themes.find((t) => t.name === savedTheme)) {
        setCurrentTheme(savedTheme)
      }

      // Depois sincronizar com o banco de dados
      await syncWithDatabase()

      setIsLoading(false)
    }

    loadTheme()
  }, [])

  // Aplicar tema ao body
  useEffect(() => {
    if (!isLoading) {
      const body = document.body

      // Remover todas as classes de tema existentes
      themes.forEach((theme) => {
        body.classList.remove(`theme-${theme.name}`)
      })

      // Adicionar a nova classe de tema
      body.classList.add(`theme-${currentTheme}`)
    }
  }, [currentTheme, isLoading])

  // Função para alterar tema (com sincronização no banco)
  const setTheme = async (theme: ThemeName) => {
    try {
      // Atualizar estado local imediatamente
      setCurrentTheme(theme)
      localStorage.setItem("theme", theme)

      // Sincronizar com banco de dados (se estiver logado)
      try {
        const response = await fetch("/api/admin/themes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ theme }),
        })

        const data = await response.json()

        if (!data.success) {
          console.warn("Aviso: Tema não foi salvo no banco:", data.error)
          // Não é um erro crítico, o tema ainda funciona localmente
        }
      } catch (error) {
        console.warn("Aviso: Erro ao salvar tema no banco:", error)
        // Não é um erro crítico, o tema ainda funciona localmente
      }
    } catch (error) {
      console.error("Erro ao alterar tema:", error)
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
        themes,
        isLoading,
        syncWithDatabase,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider")
  }
  return context
}
