import { Router } from 'express'
import { handleChatStream } from '../controllers/aiChatController.js'

const router = Router()

router.post('/api/chat', handleChatStream)

router.get('/api/get', function (req, res) {
	console.log('Received request to /, Hello !!!!', req.body)
	res.send('Hello World!!!!')
})

export default router
