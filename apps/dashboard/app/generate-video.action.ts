"use server"

import type { generateVideo as generateVideoTask } from "@saleclips/jobs"
import { tasks } from "@trigger.dev/sdk/v3"

export async function generateVideo(prompt: string) {
  return tasks.triggerAndPoll<typeof generateVideoTask>(
    "video-generation/generate-video",
    {
      prompt
    },
    {
      pollIntervalMs: 5000
    }
  )
}
