import type { Response } from 'express'
import { GoogleGenAI, ThinkingLevel } from '@google/genai'
import { instructionBuilder } from '../builders/prompt.builder.js'
import type { ChatMessage } from '@shared/index.js'

const maxOutputTokens = 700

export enum LLM_MODEL {
  Gemini_3_flash = 'gemini-3-flash-preview'
}

const apiKey = process.env.GEMINI_API_KEY

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables")
}

const ai = new GoogleGenAI({ apiKey: apiKey })

export const geminiService = async (message: string, history: ChatMessage[], res: Response) => {
  const chat = ai.chats.create({
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

  const stream = await chat.sendMessageStream({ message })

  for await (const chunk of stream) {
    // Извлекаем текст из первого кандидата (стандартный формат)
    const text = chunk.candidates?.[0]?.content?.parts?.[0]?.text
    if (text) {
      res.write(text)
    }
  }
}
