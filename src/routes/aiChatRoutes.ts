import { Router } from 'express'
import { handleChatStream } from '../controllers/aiChatController.js'

const router = Router()

router.post('/api/chat', handleChatStream)

router.get('/', function (req, res) {
	res.send('Hello World!!!!')
})

export default router
