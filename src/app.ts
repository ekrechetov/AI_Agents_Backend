import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import router from './routes/aiChatRoutes.js'
import { errorHandler } from './middlewares/errorMiddleware.js'
// import requestIdMiddleware from './middlewares/requestId.middleware.js'

const app = express()

const allowedOrigins = ['http://localhost:5173', 'https://ai-agents.kiiga89mf.com'];
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
  allowedHeaders: ['Content-Type']
}));

app.use(express.json())

app.use('/', router)

/* автоматически добавляет HTTP-заголовки безопасности */
// @ts-ignore
app.use(helmet.default ? helmet.default() : helmet())

/* Логирует входящие HTTP-запросы */
app.use(morgan('combined'))

// app.use(requestIdMiddleware)

/* For log */
// app.use((req, res, next) => {
//   console.log("EXPRESS LOG -> Method:", req.method, "URL:", req.url);
//   next();
// })

app.use(errorHandler)

export default app
