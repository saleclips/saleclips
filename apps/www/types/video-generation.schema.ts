import { z } from "zod"

export const VideoGenerationSchema = z.object({
  prompt: z.string().min(1, "The prompt cannot be empty"),
  image: z.instanceof(File, { message: "An image is required" }),
})

export type VideoGenerationInput = z.infer<typeof VideoGenerationSchema>
