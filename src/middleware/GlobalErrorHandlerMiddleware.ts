import { NextFunction as ExpressNext, Request as ExpressRequest, Response as ExpressResponse } from 'express'
import { IMiddlewareError, MiddlewareError, Request, Response, Next, Err } from '@tsed/common'
import { Exception } from 'ts-httpexceptions'
import { $log } from 'ts-log-debug'

@MiddlewareError()
export default class GlobalErrorHandlerMiddleware implements IMiddlewareError {
  use (
    @Err() error: any,
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNext
  ): any {

    if (response.headersSent) {
      return next(error)
    }

    const toHTML = (message = '') => message.replace(/\n/gi, '<br />')

    if (error instanceof Exception) {
      $log.error('' + error)
      const err = error as any

      response.status(error.status).json({
        message: err.errorMessage,
        status: error.status
      })
      return next()
    }

    if (typeof error === 'string') {
      response.status(404).send(toHTML(error))
      return next()
    }

    $log.error('' + error)
    response.status(error.status || 500).send('Internal Error')

    return next()
  }
}
