import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

export default async function Home() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/login")
  }

  console.log(data)

  return (
    <main className="flex min-h-screen flex-col p-4 justify-center items-center">
      <h1 className="font-semibold text-4xl">Dashboard</h1>
    </main>
  )
}
