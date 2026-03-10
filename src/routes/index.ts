import { Router } from 'express'
import aiChatRouter from './aiChatRoutes.js'
import pdfRouter from './pdfRoutes.js'

const router = Router()

router.use('/ai-chat', aiChatRouter)
router.use('/pdf-extractor', pdfRouter)

export default router
