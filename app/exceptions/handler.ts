import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  public async handle(error: this, { response }): Promise<void> {
    if (error?.status === 404) {
      return response.status(404).send({
        message: 'Resource not found',
      })
    }
    if (error?.status === 401) {
      return response.status(401).send({
        message: 'Not enough permissions',
      })
    }
    return response.status(error.status || 500).send({
      message: 'Something went wrong. Internal server error.',
    })
  }
  /**
   * The method is used to report error to the logging service or
   * the third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
