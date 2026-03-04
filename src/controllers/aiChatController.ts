import type { Request, Response, NextFunction } from 'express'
import type { ChatRequestDTO } from '../types/aiTypes.js'
import geminiService from '../services/geminiService.js'

export const handleChatStream = async (
  req: Request<{}, {}, ChatRequestDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('params req', req)
    const { message, history } = req.body

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

    const result = await geminiService.createChat(message, formattedHistory)

    return res.status(200).json({
      success: true,
      data: {
        role: 'model',
        content: result,
      }
    })
  } catch (error) {
    next(error)
  }
}
