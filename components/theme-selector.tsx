"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Palette, Check, ChevronDown } from "lucide-react"
import { useTheme, type ThemeName } from "@/hooks/use-theme"

export default function ThemeSelector() {
  const { currentTheme, setTheme, themes } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const currentThemeData = themes.find((t) => t.name === currentTheme)

  const handleThemeChange = (themeName: ThemeName) => {
    setTheme(themeName)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      {/* Botão principal */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-theme-bg-secondary border border-theme-border-secondary rounded-lg hover:border-theme-primary transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Palette className="h-4 w-4 text-theme-primary" />
        <span className="text-theme-text-secondary text-sm font-medium">{currentThemeData?.label}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-4 w-4 text-theme-text-muted" />
        </motion.div>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay para fechar o dropdown */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

            {/* Menu dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 right-0 z-50 min-w-[280px] bg-theme-bg-secondary border border-theme-border-secondary rounded-xl shadow-theme-lg overflow-hidden"
            >
              <div className="p-2">
                <div className="px-3 py-2 border-b border-theme-border-secondary">
                  <h3 className="text-sm font-semibold text-theme-text-primary">Escolha um tema</h3>
                  <p className="text-xs text-theme-text-muted mt-1">Personalize a aparência da página</p>
                </div>

                <div className="py-2 space-y-1">
                  {themes.map((theme) => (
                    <motion.button
                      key={theme.name}
                      onClick={() => handleThemeChange(theme.name)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-theme-bg-tertiary transition-colors group"
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Indicador de cor */}
                      <div
                        className="w-4 h-4 rounded-full border-2 border-white/20 shadow-sm"
                        style={{ backgroundColor: theme.primaryColor }}
                      />

                      {/* Informações do tema */}
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium text-theme-text-primary">{theme.label}</div>
                        <div className="text-xs text-theme-text-muted">{theme.description}</div>
                      </div>

                      {/* Indicador de seleção */}
                      {currentTheme === theme.name && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-5 h-5 rounded-full bg-theme-primary flex items-center justify-center"
                        >
                          <Check className="h-3 w-3 text-black" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>

                <div className="px-3 py-2 border-t border-theme-border-secondary">
                  <p className="text-xs text-theme-text-muted">Sua escolha será salva automaticamente</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
