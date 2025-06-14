"use client"

import type React from "react"
import { useEffect, useState, useId } from "react"
import { ThemeProvider } from "@/hooks/use-theme"

// Componente wrapper para lidar com a hidratação
export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  // Usar um estado para controlar a renderização do lado do cliente
  const [mounted, setMounted] = useState(false)
  // Use React 18's useId for generating unique IDs
  const rootId = useId()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Na primeira renderização do lado do cliente, retornar apenas o conteúdo sem classes
  if (!mounted) {
    return (
      <div id={rootId} suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </div>
    )
  }

  return (
    <div id={rootId}>
      <ThemeProvider>{children}</ThemeProvider>
    </div>
  )
}
