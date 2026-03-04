import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import router from './routes/aiChatRoutes.js'
// import errorMiddleware from './middlewares/error.middleware.js'
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

// app.use(cors({ origin: 'http://localhost:5173' }))

app.use(express.json({ limit: '1mb' }))

/* автоматически добавляет HTTP-заголовки безопасности */
// @ts-ignore
app.use(helmet.default ? helmet.default() : helmet())

/* Логирует входящие HTTP-запросы */
app.use(morgan('combined'))

// app.use(requestIdMiddleware)
// app.use(errorMiddleware)
app.use((req, res, next) => {
  console.log("EXPRESS LOG -> Method:", req.method, "URL:", req.url);
  next();
})
app.use('/', router)

export default app
