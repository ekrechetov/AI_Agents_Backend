import type { Request, Response, NextFunction } from 'express'
import type { ChatRequestDTO } from '../types/aiTypes.js'
import { geminiService } from '../services/geminiService.js'
import { AppError } from '../errors/AppError.js'

export const handleChatStream = async (
  req: Request<{}, {}, ChatRequestDTO>,
  res: Response,
  next: NextFunction
) => {
  const { message, history } = req.body

  if (!history || history.length === 0 || !message) {
    return next(new AppError('History/Message are required', 400))
  }

  try {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.setHeader('Transfer-Encoding', 'chunked')

    const formattedHistory = history.map(msg => ({
        role: msg.role,
        parts: msg.parts.map(part => ({ text: part.text }))
    }))

    await geminiService(message, formattedHistory, res)

    res.end()
  } catch (error) {
    /* если streaming уже начался */
    const message = error instanceof Error ? error.message : 'Unknown error'
    if (res.headersSent) {
      res.write('\n[ERROR]\n')
      res.write(message)
      res.end()

      return
    }

    next(new AppError('AI service failed', 500))
  }
}
