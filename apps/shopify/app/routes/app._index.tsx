import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useFetcher } from "@remix-run/react"
import type { generateVideo } from "@saleclips/jobs"
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react"
import { BlockStack, Page, Text } from "@shopify/polaris"
import { tasks } from "@trigger.dev/sdk/v3"
import { useEffect, useState } from "react"
import { authenticate } from "../shopify.server"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request)

  return null
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request)

  const generateVideoTask = await tasks.triggerAndPoll<typeof generateVideo>(
    "video-generation/generate-video",
    {
      prompt: "A man walking in the park."
    },
    {
      pollIntervalMs: 5000
    }
  )

  if (generateVideoTask.error) {
    throw generateVideoTask.error
  }

  return json({
    videoUrl: generateVideoTask.output
  })
}

export default function Index() {
  const fetcher = useFetcher<typeof action>()
  const [videoUrl, setVideoUrl] = useState<string | null>(null)

  const shopify = useAppBridge()
  const isLoading =
    ["loading", "submitting"].includes(fetcher.state) &&
    fetcher.formMethod === "POST"

  useEffect(() => {
    if (fetcher.data?.videoUrl) {
      setVideoUrl(fetcher.data.videoUrl)
      shopify.toast.show("Video created")
    }
  }, [fetcher.data, shopify])

  const openResourcePicker = async () => {
    const products = await window.shopify.resourcePicker({
      type: "product",
      action: "select",
      multiple: false
    })
  }

  const generateVideo = () => fetcher.submit({}, { method: "POST" })

  return (
    <Page>
      <TitleBar title="SaleClips">
        <button type="button" variant="primary" onClick={generateVideo}>
          Generate a video
        </button>
      </TitleBar>
      {isLoading || videoUrl ? (
        <BlockStack gap="300">
          {isLoading && (
            <Text as="h2" variant="headingMd">
              Dreaming...
            </Text>
          )}
          {videoUrl && (
            <video controls>
              <source src={videoUrl} type="video/mp4" />
              <track kind="captions" srcLang="en" label="English" />
            </video>
          )}
        </BlockStack>
      ) : null}
    </Page>
  )
}
