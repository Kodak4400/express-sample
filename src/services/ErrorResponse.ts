import createHTTPError from 'http-errors'
import { Request, Response, NextFunction } from 'express'

interface HTTPErrorResponse {
  type?: string
  message: string
  stack?: string
}

export function errorResponse(err: Error, req: Request, res: Response, next: NextFunction) {
  let errStatus = 500
  const errResponse: HTTPErrorResponse = {
    message: 'Internal Server Error',
  }

  if (err instanceof createHTTPError.HttpError) {
    errStatus = err.status
    errResponse.message = err.message

    if (process.env.NODE_ENV === 'development') {
      errResponse.type = err.name
      errResponse.stack = err.stack
    }
  } else {
    // HttpError以外のError => Logを残す.
  }

  res.status(errStatus)
  res.json(errResponse)
}

