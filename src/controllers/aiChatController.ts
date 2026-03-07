import type { Request, Response, NextFunction } from 'express'
import type { ChatRequestDTO } from '../types/aiTypes.js'
import { geminiService } from '../services/geminiService.js'

export const handleChatStream = async (
  req: Request<{}, {}, ChatRequestDTO>,
  res: Response,
  next: NextFunction
) => {
  const { message, history } = req.body

  if (!history || history.length === 0 || !message) {
    return res.status(400).json({
      success: false,
      message: 'History/Message are required',
    })
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
    if (res.headersSent) {
      res.write('\n[ERROR]\n')
      res.write((error as Error).message)
      res.end()

      return
    }

    next(error)
    res.end()
  }
}
