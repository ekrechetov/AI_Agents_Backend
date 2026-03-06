import { GoogleGenAI, ThinkingLevel } from '@google/genai'
import { instructionBuilder } from '../builders/prompt.builder.js'
import type { ChatMessageDTO } from '../types/aiTypes.js'

export enum LLM_MODEL {
  Gemini_3_flash = 'gemini-3-flash-preview'
}

const maxOutputTokens = 700

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
			history,
      config: {
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.LOW // 'MINIMAL' | 'LOW' | 'MEDIUM' | 'HIGH'
        },
        systemInstruction: instructionBuilder?.buildInstructions(),
        maxOutputTokens,
        temperature: 1.0 // default is 1.0
      }
    })

    return await chat.sendMessageStream({ message })
  }
}

export default new GeminiService()
