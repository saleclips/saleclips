"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  VideoGenerationInput,
  VideoGenerationSchema,
} from "@/types/video-generation.schema"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function VideoGenerationForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [taskId, setTaskId] = useState<string | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<VideoGenerationInput>({
    resolver: zodResolver(VideoGenerationSchema),
    defaultValues: {
      prompt: "",
    },
  })

  const onSubmit = async (data: VideoGenerationInput) => {
    setIsLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append("prompt", data.prompt)
    formData.append("image", data.image)

    try {
      const response = await fetch("/api/generate-video", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to generate video")
      }

      const result = await response.json()
      setTaskId(result.taskId)
      await checkVideoStatusRepeatedly(result.taskId)
    } catch (error) {
      if (error instanceof Error) {
        setError(
          error.message || "An error occurred while generating the video."
        )
      }
    } finally {
      setIsLoading(false)
    }
  }

  const checkVideoStatusRepeatedly = async (id: string) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/check-video-status?taskId=${id}`)
        if (!response.ok) {
          throw new Error("Failed to check video status")
        }
        const result = await response.json()
        if (result.status === "completed") {
          clearInterval(interval)
          setVideoUrl(result.videoUrl)
        } else if (result.status === "failed") {
          clearInterval(interval)
          setError("Video generation has failed.")
        }
      } catch (error) {
        clearInterval(interval)
        setError(
          "An error occurred while checking the video generation status."
        )
      }
    }, 5000)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Generate a video</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <FormDescription>
                    Select an image to generate the video
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prompt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the video you want to generate"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter a detailed prompt to generate the video
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "In progress..." : "Generate video"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        {error && <p className="text-red-500">{error}</p>}
        {taskId && !videoUrl && <p>Video is generating...</p>}
        {videoUrl && (
          <div className="mt-4">
            <video src={videoUrl} controls className="mt-2 max-w-full" />
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
