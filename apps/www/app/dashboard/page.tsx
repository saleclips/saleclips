import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

import { Navbar } from "@/app/dashboard/navbar"

export default async function Home() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/login")
  }

  return (
    <main className="flex h-screen flex-col">
      <Navbar />
    </main>
  )
}
