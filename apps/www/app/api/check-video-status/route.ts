import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const taskId = request.nextUrl.searchParams.get("taskId")

  if (!taskId) {
    return NextResponse.json({ message: "Missing taskId" }, { status: 400 })
  }

  try {
    // Check against the AI service

    await new Promise((resolve) => setTimeout(resolve, 1000))
    const status = Math.random() > 0.5 ? "completed" : "processing"

    return NextResponse.json({
      status,
      videoUrl:
        status === "completed" ? "https://example.com/fake-video.mp4" : null,
    })
  } catch (error) {
    console.error("Error checking video status:", error)
    return NextResponse.json(
      { message: "Error checking video status" },
      { status: 500 }
    )
  }
}
