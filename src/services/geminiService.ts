import { GoogleGenAI } from '@google/genai'
// import 'dotenv/config'
import type { ChatMessageDTO } from '../types/aiTypes.js'

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

  async createChat(messages: ChatMessageDTO[]) {
    const chat = await this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      history: messages.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      })),
    })

    const response = await chat.sendMessage({
      message: messages[messages.length - 1].content,
    })

    return response.text
  }
}

export default new GeminiService()