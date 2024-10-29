import type { Metadata } from "next"

import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"

import "@saleclips/ui/globals.css"
import "@/styles/globals.css"
import { cn } from "@saleclips/ui/utils"

export const metadata: Metadata = {
  title: "SaleClips",
  description: "Boost your sales with marketing clips in minutes."
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          GeistMono.variable,
          GeistSans.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}
