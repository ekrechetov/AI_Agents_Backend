import type { Request, Response, NextFunction } from 'express'
import type { ChatRequestDTO } from '../types/aiTypes.js'
import geminiService from '../services/geminiService.js'

export const handleChatStream = async (
  req: Request<{}, {}, ChatRequestDTO>,
  res: Response,
  next: NextFunction
) => {
  const { message, history } = req.body
  try {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.setHeader('Transfer-Encoding', 'chunked')

    if (!history || history.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'History is required',
      })
    }

    const formattedHistory = history.map(msg => ({
        role: msg.role,
        parts: msg.parts.map(part => ({ text: part.text }))
    }))

    const stream = await geminiService.createChat(message, formattedHistory)

    for await (const chunk of stream) {
      // Извлекаем текст из первого кандидата (стандартный формат)
      const text = chunk.candidates?.[0]?.content?.parts?.[0]?.text
      if (text) {
        res.write(text)
      }
    }

    res.end()
  } catch (error) {
    next(error)
    res.end()
  }
}
