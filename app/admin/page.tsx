import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import AdminDashboard from "./components/AdminDashboard"

export default async function AdminPage() {
  try {
    const { userId } = await auth()

    // Redirecionar usuários não autenticados
    if (!userId) {
      redirect("/sign-in")
    }

    return <AdminDashboard />
  } catch (error) {
    console.error("Erro ao verificar autenticação:", error)
    redirect("/sign-in")
  }
}
