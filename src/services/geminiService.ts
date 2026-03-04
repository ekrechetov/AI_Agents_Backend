import { GoogleGenAI } from '@google/genai'
import type { ChatMessageDTO } from '../types/aiTypes.js'

export enum LLM_MODEL {
  Gemini_3_flash = 'gemini-3-flash-preview'
}

class GeminiService {

  private ai: GoogleGenAI

  constructor() {
		const apiKey = process.env.GEMINI_API_KEY
		if (!apiKey) {
			throw new Error("GEMINI_API_KEY is not defined in environment variables");
		}
    this.ai = new GoogleGenAI({
      apiKey: apiKey
    })
  }

  async createChat(message: string, history: ChatMessageDTO[]) {
    const chat = this.ai.chats.create({
      model: LLM_MODEL.Gemini_3_flash,
			history: history
    })

    const response = await chat.sendMessage({
      message: message
    })

    return response.text
  }
}

export default new GeminiService()
