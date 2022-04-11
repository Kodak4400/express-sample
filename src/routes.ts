import createHTTPError from 'http-errors'
import express, { Request, Response, NextFunction} from 'express'
import { getLocalEnvironment } from './lib/environment'
import { getIndexResponse } from './services/GetIndexResponse'

getLocalEnvironment()

const router = express.Router()

const apiVersion = process.env.API_VERSION ? process.env.API_VERSION : 'v0'
const baseUrl = `/api/${apiVersion}`

router.get(`${baseUrl}/`, (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(getIndexResponse(req))
})

router.get(`${baseUrl}/users`, (req: Request, res: Response, next: NextFunction) => {
  res.json({'path':'/users', 'msg':'Got a POST request'})
})

// Catch 404 and Forward to error handler
router.use((req: Request, res: Response, next: NextFunction) => {
  next(createHTTPError(404))
})

export default router
