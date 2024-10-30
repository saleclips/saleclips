import { task } from "@trigger.dev/sdk/v3"
import { lumaClient } from "../client"

export const generateVideo = task({
  id: "video-generation/generate-video",
  run: async (payload: { prompt: string }) => {
    let generation = await lumaClient.generations.create({
      prompt: payload.prompt
    })

    let completed = false

    while (!completed) {
      if (generation.id != null) {
        generation = await lumaClient.generations.get(generation.id)
      }

      if (generation.state === "completed") {
        completed = true
      } else if (generation.state === "failed") {
        throw new Error(`Generation failed: ${generation.failure_reason}`)
      } else {
        await new Promise((r) => setTimeout(r, 3000)) // Wait for 3 seconds
      }
    }

    return generation.assets?.video
  }
})
