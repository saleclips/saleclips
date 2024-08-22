import VideoGenerationForm from "@/components/video-generation-form"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-4 justify-center items-center">
      <h1 className="font-semibold text-4xl">SaleClips.ai</h1>
      <br />
      <VideoGenerationForm />
    </main>
  )
}
