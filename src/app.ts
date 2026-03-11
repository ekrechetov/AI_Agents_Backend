import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
// import router from './routes/aiChatRoutes.js'
import router from './routes/index.js'
import { errorHandler } from './middlewares/errorMiddleware.js'

const app = express()

const allowedOrigins = ['http://localhost:5173', 'https://ai-agents.kiiga89mf.com']
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Content-Transfer-Encoding']
}))
// Важно: вручную обрабатываем OPTIONS для Vercel
app.options('*', cors())

/* Logs incoming HTTP requests */
app.use(morgan('dev'))

app.use(express.json())

app.use(express.text({ type: 'application/octet-stream', limit: '10mb' }))

app.use('/api', router)

/* Automatically adds HTTP security headers */
// @ts-ignore
app.use(helmet.default ? helmet.default() : helmet())

app.use(errorHandler)

export default app
