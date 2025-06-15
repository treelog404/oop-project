import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()

        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR

        const message = exception instanceof HttpException
            ? exception.getResponse()
            : 'Internal server error'

        Object.assign(message, {
            timestamp: new Date().toISOString(),
            path: request.url,
        })

        response.status(status).json(message)
    }
}