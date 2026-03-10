import type { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors/AppError.js'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500
  let status = 'error'
  let message = err.message

  if (res.headersSent) {
    return next(err)
  }

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    status = err.status;
  }
  
  res.status(statusCode).json({
    statusCode: statusCode,
    status: status,
    message: message || 'Internal server error (500)'
  })
}
