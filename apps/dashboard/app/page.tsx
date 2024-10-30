"use client"

import { generateVideo } from "@/app/generate-video.action"
import { Button } from "@saleclips/ui/button"
import { Loader2 } from "lucide-react"
import { useState } from "react"

export default function Home() {
  const [video, setVideo] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function generateVideoHandler() {
    try {
      setIsLoading(true)
      const { output } = await generateVideo("A man walking in the street")
      if (!output) throw new Error("No output")
      setVideo(output)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-4">
      {video && (
        <video controls>
          <source src={video} type="video/mp4" />
          <track kind="captions" srcLang="en" label="English" />
        </video>
      )}
      <Button disabled={isLoading} onClick={generateVideoHandler}>
        {isLoading && <Loader2 className="size-4 animate-spin" />}
        {isLoading ? "Dreaming..." : "Generate video"}
      </Button>
    </div>
  )
}
