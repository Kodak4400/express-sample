import express from 'express'
import cookieParser from 'cookie-parser'
// import logger from 'log4js'
import router from './routes'
import { errorResponse } from './services/ErrorResponse'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(router)

// Error-Handler middleware
app.use(errorResponse)

export default app
