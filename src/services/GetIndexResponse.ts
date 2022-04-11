import { Request } from 'express'

export function getIndexResponse(req: Request) {
  return {'path':'/', 'msg':'Got a POST request'}
}
