import type { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors/AppError.js'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('ErrorHandler error', err)
  if (res.headersSent) {
    return next(err)
  }

  const statusCode = err instanceof AppError ? err.statusCode : 500
  
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error (500)'
  })
}
