"use client"

import { inngest } from "@/inngest/client"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-4 justify-center items-center">
      <h1 className="font-semibold text-4xl">SaleClips.ai</h1>
      <button
        onClick={async () =>
          await inngest.send({
            name: "test/hello.world",
            data: {
              email: "testFromNext@example.com",
            },
          })
        }
      >
        Trigger queue
      </button>
    </main>
  )
}
