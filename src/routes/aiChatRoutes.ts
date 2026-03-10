import { Router } from 'express'
import { handleChatStream } from '../controllers/aiChatController.js'

const router = Router()

router.post('/chat', handleChatStream)

export default router
