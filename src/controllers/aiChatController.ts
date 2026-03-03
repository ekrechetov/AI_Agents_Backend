import type { Request, Response, NextFunction } from 'express'
import type { ChatRequestDTO } from '../types/aiTypes.js'

import geminiService from '../services/geminiService.js'
// import { BAD_REQUEST } from '../constants/httpStatus.js'
// import AppError from '../utils/AppError.js'

export const handleChatStream = async (
  req: Request<{}, {}, ChatRequestDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message, history } = req.body

    if (!history || history.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'History is required',
      })
    }
    console.log('Received chat history:', history)
    console.log('Received chat messages:', message)
    const result = await geminiService.createChat(message, history)

    return res.status(200).json({
      success: true,
      data: {
        role: 'model',
        content: result,
      },
    })
  } catch (error) {
    next(error)
  }
}


// export const handleChatStream = async (req: Request, res: Response) => {
//   const { prompt } = req.body

//   if (!prompt) {
//     throw new AppError('Prompt is required', BAD_REQUEST)
//   }

//   const result = await geminiService.createChat(prompt)

//   res.status(200).json({
//     success: true,
//     data: result,
//   })
// }