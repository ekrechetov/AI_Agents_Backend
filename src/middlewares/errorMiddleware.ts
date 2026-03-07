import type { Request, Response, NextFunction } from 'express'

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
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error (500)'
  })
}
