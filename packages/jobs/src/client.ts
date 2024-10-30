import { LumaAI } from "lumaai"

export const lumaClient = new LumaAI({
  authToken: process.env.LUMAAI_API_KEY
})
