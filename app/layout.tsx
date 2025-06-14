import type React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { ThemeProvider } from "@/hooks/use-theme"; // Importar o ThemeProvider
import "./globals.css";

// Metadata definida diretamente aqui
export const metadata = {
  title: "Marketing Mastery - 1K por dia com produtos low ticket",
  description:
    "Aprenda a criar e vender produtos digitais low ticket que geram R$1.000 por dia com tráfego direto.",
  generator: "v0.dev",
};

const inter = Inter({ subsets: ["latin"] });

// Componente principal do layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="pt-BR">
        <body className={inter.className} suppressHydrationWarning>
          <ThemeProvider>
            <Suspense
              fallback={
                <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    {/* Spinner principal com cor do tema */}
                    <div className="w-12 h-12 border-4 border-gray-800 border-t-theme-primary rounded-full animate-spin"></div>

                    {/* Texto de carregamento */}
                    <div className="text-center">
                      <h2 className="text-xl font-semibold text-white mb-2">Carregando...</h2>
                      <p className="text-gray-400 text-sm">Preparando sua experiência</p>
                    </div>

                    {/* Barra de progresso animada */}
                    <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-theme-primary rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              }
            >
              {children}
            </Suspense>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
