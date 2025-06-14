"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/hooks/use-theme"
import { Palette, Sparkles, Zap, Heart } from "lucide-react"

export default function ThemeDemo() {
  const { currentTheme, themes } = useTheme()
  const currentThemeData = themes.find((t) => t.name === currentTheme)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-theme-bg-secondary border border-theme-border-primary/20 rounded-xl p-6 shadow-theme"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-theme-primary rounded-full flex items-center justify-center">
          <Palette className="h-5 w-5 text-black" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-theme-text-primary">Tema Ativo: {currentThemeData?.label}</h3>
          <p className="text-sm text-theme-text-muted">{currentThemeData?.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Demonstração de cores */}
        <div className="space-y-2">
          <div className="w-full h-8 bg-theme-primary rounded"></div>
          <p className="text-xs text-theme-text-muted">Primária</p>
        </div>

        <div className="space-y-2">
          <div className="w-full h-8 bg-theme-primary-dark rounded"></div>
          <p className="text-xs text-theme-text-muted">Primária Escura</p>
        </div>

        <div className="space-y-2">
          <div className="w-full h-8 bg-theme-gradient rounded"></div>
          <p className="text-xs text-theme-text-muted">Gradiente</p>
        </div>

        <div className="space-y-2">
          <div className="w-full h-8 bg-theme-bg-tertiary border border-theme-border-primary/30 rounded"></div>
          <p className="text-xs text-theme-text-muted">Fundo</p>
        </div>
      </div>

      {/* Elementos interativos */}
      <div className="mt-6 flex flex-wrap gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-theme-primary text-black font-medium rounded-lg hover:bg-theme-primary-dark transition-colors"
        >
          <Sparkles className="h-4 w-4" />
          Botão Primário
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 border border-theme-primary text-theme-primary font-medium rounded-lg hover:bg-theme-primary/10 transition-colors"
        >
          <Zap className="h-4 w-4" />
          Botão Secundário
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-theme-bg-tertiary border border-theme-border-secondary text-theme-text-secondary font-medium rounded-lg hover:border-theme-primary transition-colors"
        >
          <Heart className="h-4 w-4" />
          Botão Neutro
        </motion.button>
      </div>
    </motion.div>
  )
}
