import { NextRequest, NextResponse } from "next/server"

import { VideoGenerationSchema } from "@/types/video-generation.schema"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const prompt = formData.get("prompt") as string
    const image = formData.get("image") as File

    if (!prompt || !image) {
      return NextResponse.json(
        { message: "Missing prompt or image" },
        { status: 400 }
      )
    }

    const validatedData = VideoGenerationSchema.parse({
      prompt,
      image,
    })

    // Call the AI service

    await new Promise((resolve) => setTimeout(resolve, 2000))
    const taskId = "fake-task-id-" + Date.now()

    return NextResponse.json({ taskId })
  } catch (error) {
    console.error("Error generating video:", error)
    return NextResponse.json(
      { message: "Error generating video" },
      { status: 500 }
    )
  }
}
