import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    private readonly logger = new Logger("ExceptionFilter");

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const error = exception.getResponse();

        this.logger.error(status + " " + request.url + " " + JSON.stringify(error));

        response
            .status(status)
            .json({
                error: error,
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
    }
}
