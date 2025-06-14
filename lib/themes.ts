export interface Theme {
  id: string
  name: string
  label: string
  description: string
  colors: {
    primary: string
    primaryDark: string
    primaryLight: string
    secondary: string
    secondaryDark: string
    bgPrimary: string
    bgSecondary: string
    bgTertiary: string
    bgAccent: string
    textPrimary: string
    textSecondary: string
    textMuted: string
    textAccent: string
    borderPrimary: string
    borderSecondary: string
    shadowPrimary: string
    gradientFrom: string
    gradientTo: string
  }
}

export const themes: Theme[] = [
  {
    id: "green",
    name: "green",
    label: "Verde",
    description: "Tema padrão com cores verdes vibrantes",
    colors: {
      primary: "34 197 94", // green-500
      primaryDark: "21 128 61", // green-700
      primaryLight: "74 222 128", // green-400
      secondary: "156 163 175", // gray-400
      secondaryDark: "107 114 128", // gray-500
      bgPrimary: "0 0 0", // black
      bgSecondary: "17 24 39", // gray-900
      bgTertiary: "31 41 55", // gray-800
      bgAccent: "34 197 94", // green-500
      textPrimary: "255 255 255", // white
      textSecondary: "209 213 219", // gray-300
      textMuted: "156 163 175", // gray-400
      textAccent: "34 197 94", // green-500
      borderPrimary: "34 197 94", // green-500
      borderSecondary: "75 85 99", // gray-600
      shadowPrimary: "34 197 94", // green-500
      gradientFrom: "74 222 128", // green-400
      gradientTo: "21 128 61", // green-700
    },
  },
  {
    id: "blue",
    name: "blue",
    label: "Azul",
    description: "Tema profissional com tons de azul",
    colors: {
      primary: "59 130 246", // blue-500
      primaryDark: "29 78 216", // blue-700
      primaryLight: "96 165 250", // blue-400
      secondary: "156 163 175", // gray-400
      secondaryDark: "107 114 128", // gray-500
      bgPrimary: "0 0 0", // black
      bgSecondary: "17 24 39", // gray-900
      bgTertiary: "31 41 55", // gray-800
      bgAccent: "59 130 246", // blue-500
      textPrimary: "255 255 255", // white
      textSecondary: "209 213 219", // gray-300
      textMuted: "156 163 175", // gray-400
      textAccent: "59 130 246", // blue-500
      borderPrimary: "59 130 246", // blue-500
      borderSecondary: "75 85 99", // gray-600
      shadowPrimary: "59 130 246", // blue-500
      gradientFrom: "96 165 250", // blue-400
      gradientTo: "29 78 216", // blue-700
    },
  },
  {
    id: "purple",
    name: "purple",
    label: "Roxo",
    description: "Tema criativo com cores roxas",
    colors: {
      primary: "147 51 234", // purple-500
      primaryDark: "109 40 217", // purple-700
      primaryLight: "168 85 247", // purple-400
      secondary: "156 163 175", // gray-400
      secondaryDark: "107 114 128", // gray-500
      bgPrimary: "0 0 0", // black
      bgSecondary: "17 24 39", // gray-900
      bgTertiary: "31 41 55", // gray-800
      bgAccent: "147 51 234", // purple-500
      textPrimary: "255 255 255", // white
      textSecondary: "209 213 219", // gray-300
      textMuted: "156 163 175", // gray-400
      textAccent: "147 51 234", // purple-500
      borderPrimary: "147 51 234", // purple-500
      borderSecondary: "75 85 99", // gray-600
      shadowPrimary: "147 51 234", // purple-500
      gradientFrom: "168 85 247", // purple-400
      gradientTo: "109 40 217", // purple-700
    },
  },
  {
    id: "red",
    name: "red",
    label: "Vermelho",
    description: "Tema energético com tons vermelhos",
    colors: {
      primary: "239 68 68", // red-500
      primaryDark: "185 28 28", // red-700
      primaryLight: "248 113 113", // red-400
      secondary: "156 163 175", // gray-400
      secondaryDark: "107 114 128", // gray-500
      bgPrimary: "0 0 0", // black
      bgSecondary: "17 24 39", // gray-900
      bgTertiary: "31 41 55", // gray-800
      bgAccent: "239 68 68", // red-500
      textPrimary: "255 255 255", // white
      textSecondary: "209 213 219", // gray-300
      textMuted: "156 163 175", // gray-400
      textAccent: "239 68 68", // red-500
      borderPrimary: "239 68 68", // red-500
      borderSecondary: "75 85 99", // gray-600
      shadowPrimary: "239 68 68", // red-500
      gradientFrom: "248 113 113", // red-400
      gradientTo: "185 28 28", // red-700
    },
  },
  {
    id: "pink",
    name: "pink",
    label: "Rosa",
    description: "Tema moderno com cores rosas",
    colors: {
      primary: "236 72 153", // pink-500
      primaryDark: "190 24 93", // pink-700
      primaryLight: "244 114 182", // pink-400
      secondary: "156 163 175", // gray-400
      secondaryDark: "107 114 128", // gray-500
      bgPrimary: "0 0 0", // black
      bgSecondary: "17 24 39", // gray-900
      bgTertiary: "31 41 55", // gray-800
      bgAccent: "236 72 153", // pink-500
      textPrimary: "255 255 255", // white
      textSecondary: "209 213 219", // gray-300
      textMuted: "156 163 175", // gray-400
      textAccent: "236 72 153", // pink-500
      borderPrimary: "236 72 153", // pink-500
      borderSecondary: "75 85 99", // gray-600
      shadowPrimary: "236 72 153", // pink-500
      gradientFrom: "244 114 182", // pink-400
      gradientTo: "190 24 93", // pink-700
    },
  },
  {
    id: "orange",
    name: "orange",
    label: "Laranja",
    description: "Tema caloroso com tons laranja",
    colors: {
      primary: "249 115 22", // orange-500
      primaryDark: "194 65 12", // orange-700
      primaryLight: "251 146 60", // orange-400
      secondary: "156 163 175", // gray-400
      secondaryDark: "107 114 128", // gray-500
      bgPrimary: "0 0 0", // black
      bgSecondary: "17 24 39", // gray-900
      bgTertiary: "31 41 55", // gray-800
      bgAccent: "249 115 22", // orange-500
      textPrimary: "255 255 255", // white
      textSecondary: "209 213 219", // gray-300
      textMuted: "156 163 175", // gray-400
      textAccent: "249 115 22", // orange-500
      borderPrimary: "249 115 22", // orange-500
      borderSecondary: "75 85 99", // gray-600
      shadowPrimary: "249 115 22", // orange-500
      gradientFrom: "251 146 60", // orange-400
      gradientTo: "194 65 12", // orange-700
    },
  },
  {
    id: "cyan",
    name: "cyan",
    label: "Ciano",
    description: "Tema fresco com cores ciano",
    colors: {
      primary: "6 182 212", // cyan-500
      primaryDark: "14 116 144", // cyan-700
      primaryLight: "34 211 238", // cyan-400
      secondary: "156 163 175", // gray-400
      secondaryDark: "107 114 128", // gray-500
      bgPrimary: "0 0 0", // black
      bgSecondary: "17 24 39", // gray-900
      bgTertiary: "31 41 55", // gray-800
      bgAccent: "6 182 212", // cyan-500
      textPrimary: "255 255 255", // white
      textSecondary: "209 213 219", // gray-300
      textMuted: "156 163 175", // gray-400
      textAccent: "6 182 212", // cyan-500
      borderPrimary: "6 182 212", // cyan-500
      borderSecondary: "75 85 99", // gray-600
      shadowPrimary: "6 182 212", // cyan-500
      gradientFrom: "34 211 238", // cyan-400
      gradientTo: "14 116 144", // cyan-700
    },
  },
]

export function getThemeById(id: string): Theme | undefined {
  return themes.find((theme) => theme.id === id)
}

export function getDefaultTheme(): Theme {
  return themes[0] // Verde como padrão
}
