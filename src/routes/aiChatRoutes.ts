import { Router } from 'express'
import { handleChatStream } from '../controllers/aiChatController.js'

const router = Router()

router.post('/api/chat', handleChatStream)

export default router
