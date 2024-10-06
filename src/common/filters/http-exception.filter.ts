import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { CustomLogger } from '../utils/logger.util';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new CustomLogger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
      message: typeof exceptionResponse === 'string' ? exceptionResponse : (exceptionResponse as any).message || 'Internal server error',
    };

    this.logger.error(`HTTP Exception: ${JSON.stringify(errorResponse)}`, exception.stack);

    response.status(status).send(errorResponse);
  }
}