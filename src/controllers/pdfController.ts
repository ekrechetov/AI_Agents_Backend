import type { Request, Response, NextFunction } from 'express'
import { geminiService } from '../services/geminiService.js'
import { AppError } from '../errors/AppError.js'

export const handlePdf = async (
  req: Request<string>,
  res: Response,
  next: NextFunction
) => {
  const pdfBase64  = req.body

  if (!pdfBase64) {
    return next(new AppError('PDF file as Base64 is required', 400))
  }

  try {
    const result = await geminiService.pdfExtractor(pdfBase64)
    res.json(result)
  } catch (error: any) {
    let finalMessage = 'AI service failed'
    let finalCode = error.status || 500;
    try {
      // Try parsing the inner JSON from Gemini, if it exists
      const innerError = JSON.parse(error.message)
      if (innerError.error) {
        finalMessage = innerError.error.message;
        finalCode = innerError.error.code || finalCode
      }
    } catch {
      // If it's not JSON, keep the text as is
      finalMessage = error.message
    }

    next(new AppError(finalMessage, finalCode))
  }
}
