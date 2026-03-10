import { Router } from 'express'
import { handlePdf } from '../controllers/pdfController.js'

const router = Router()

router.post('/extractor', handlePdf)

export default router
