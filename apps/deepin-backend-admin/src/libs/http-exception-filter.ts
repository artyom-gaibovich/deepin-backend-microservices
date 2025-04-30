import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ColoredLogger } from './logging-interceptor';
import { Prisma } from '@prisma/client';

export const HTTP_CODE_FROM_PRISMA: Record<string, { status: number; message: string }> = {
	// operation time out
	P1008: {
		status: HttpStatus.REQUEST_TIMEOUT,
		message: 'Request timeout',
	},
	// too long input
	P2000: { status: HttpStatus.BAD_REQUEST, message: 'Input Data is too long' },
	// searched entity not exists
	P2001: { status: HttpStatus.NO_CONTENT, message: 'Record does not exist' },
	// unique constraint or duplication
	P2002: {
		status: HttpStatus.CONFLICT,
		message: 'Reference Data already exists',
	},
	// foreign key constraint
	P2003: {
		status: HttpStatus.UNPROCESSABLE_ENTITY,
		message: 'The provided input can not be processed',
	},
	P2014: {
		status: HttpStatus.UNPROCESSABLE_ENTITY,
		message: 'The provided input can not be processed',
	},
	// update entity not found
	P2016: {
		status: HttpStatus.NOT_FOUND,
		message: 'The entity to update does not exist',
	},
	// out of range
	P2020: {
		status: HttpStatus.UNPROCESSABLE_ENTITY,
		message: 'The provided input can not be processed',
	},
	// internal server error
	P2021: {
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		message: 'Internal server error',
	},
	// not found error
	P2025: {
		status: HttpStatus.NOT_FOUND,
		message: 'The queried entity does not exist',
	},
};
export const HTTP_CODES: Record<number, number> = {
	[HttpStatus.OK]: HttpStatus.OK,
	[HttpStatus.BAD_GATEWAY]: HttpStatus.BAD_GATEWAY,
	[HttpStatus.UNPROCESSABLE_ENTITY]: HttpStatus.UNPROCESSABLE_ENTITY,
	[HttpStatus.REQUEST_TIMEOUT]: HttpStatus.REQUEST_TIMEOUT,
	[HttpStatus.NOT_FOUND]: HttpStatus.NOT_FOUND,
	[HttpStatus.CONFLICT]: HttpStatus.CONFLICT,
	[HttpStatus.FORBIDDEN]: HttpStatus.FORBIDDEN,
	[HttpStatus.PRECONDITION_REQUIRED]: HttpStatus.PRECONDITION_REQUIRED,
	[HttpStatus.METHOD_NOT_ALLOWED]: HttpStatus.METHOD_NOT_ALLOWED,
	[HttpStatus.PAYLOAD_TOO_LARGE]: HttpStatus.PAYLOAD_TOO_LARGE,
	[HttpStatus.NOT_IMPLEMENTED]: HttpStatus.NOT_IMPLEMENTED,
	[HttpStatus.BAD_REQUEST]: HttpStatus.BAD_REQUEST,
	[HttpStatus.INTERNAL_SERVER_ERROR]: HttpStatus.INTERNAL_SERVER_ERROR,
	[HttpStatus.UNAUTHORIZED]: HttpStatus.UNAUTHORIZED,
};

@Catch(
	HttpException,
	Prisma.PrismaClientInitializationError,
	Prisma.PrismaClientValidationError,
	Prisma.PrismaClientKnownRequestError,
	Prisma.PrismaClientUnknownRequestError,
	Prisma.PrismaClientRustPanicError,
)
export class HttpExceptionFilter
	implements
		ExceptionFilter<
			| HttpException
			| Prisma.PrismaClientInitializationError
			| Prisma.PrismaClientValidationError
			| Prisma.PrismaClientKnownRequestError
			| Prisma.PrismaClientUnknownRequestError
			| Prisma.PrismaClientRustPanicError
			| Error
		>
{
	private readonly logger = new ColoredLogger(HttpExceptionFilter.name);

	catch(
		exception: HttpException | Error,
		host: ArgumentsHost,
	): Response<string, Record<string, string>> {
		this.logger.error(exception.message, exception.stack);
		const request = host.switchToHttp().getRequest<Request>();
		const response = host.switchToHttp().getResponse<Response>();

		if (
			exception instanceof Prisma.PrismaClientInitializationError ||
			exception instanceof Prisma.PrismaClientValidationError ||
			exception instanceof Prisma.PrismaClientKnownRequestError ||
			exception instanceof Prisma.PrismaClientUnknownRequestError ||
			exception instanceof Prisma.PrismaClientRustPanicError
		) {
			if ('code' in exception && exception.code && HTTP_CODE_FROM_PRISMA?.[exception.code]) {
				const mapper = HTTP_CODE_FROM_PRISMA[exception.code];
				const statusCode = mapper.status;
				const message = mapper.message;
				this.logger.error(
					JSON.stringify({
						message: exception.message,
						method: request.method,
						url: request.url,
						body: request.body,
					}),
					exception.stack,
				);
				return response.status(statusCode).json({
					error: message,
					method: request.method,
					url: request.url,
					body: request.body,
				});
			}
		}

		if (exception instanceof HttpException) {
			this.logger.error(
				JSON.stringify({
					method: request.method,
					url: request.url,
					body: request.body,
				}),
				exception.stack,
			);
			if (exception.getStatus() === HttpStatus.INTERNAL_SERVER_ERROR)
				return response.status(500).json();
			if (Object.keys(HTTP_CODES).includes(String(exception.getStatus()))) {
				return response.status(exception.getStatus()).json({
					message: (exception.getResponse() as typeof exception & { message: any }).message,
					method: request.method,
					url: request.url,
					body: request.body,
				});
			}
		}

		this.logger.error(
			{
				request: {
					method: request.method,
					url: request.url,
					body: request.body,
				},
			},
			exception.stack,
		);
		return response.status(500).json();
	}
}
