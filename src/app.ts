import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

// import aiRoutes from './routes/ai.routes.js'
// import errorMiddleware from './middlewares/error.middleware.js'
// import requestIdMiddleware from './middlewares/requestId.middleware.js'

const app = express()

app.use(cors({ origin: 'http://localhost:5173' }))

app.use(express.json({ limit: '1mb' }))

/* автоматически добавляет HTTP-заголовки безопасности */
// @ts-ignore
app.use(helmet.default ? helmet.default() : helmet())

/* Логирует входящие HTTP-запросы */
app.use(morgan('combined'))

// app.use(requestIdMiddleware)
// app.use('/api/ai', aiRoutes)
// app.use(errorMiddleware)

export default app
