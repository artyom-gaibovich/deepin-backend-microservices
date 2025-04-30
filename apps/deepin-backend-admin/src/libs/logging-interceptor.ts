import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  LogLevel,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { map, Observable } from 'rxjs';

import chalk from 'chalk';

export class ColoredLogger extends ConsoleLogger {
  private readonly default: chalk.ChalkFunction;
  private readonly contextLabel = chalk.bold.blue('[App]');
  constructor(defaultColor = '#1b51c7') {
    super();
    this.default = chalk.hex(defaultColor);
  }

  protected formatMessage(
    logLevel: LogLevel,
    message: unknown,
    pidMessage: string,
    formattedLogLevel: string,
    contextMessage: string,
    timestampDiff: string
  ): string {
    const timestamp = chalk.gray(`[${new Date().toISOString()}]`);
    const ctx = contextMessage ? chalk.red(`${contextMessage}`) : '';
    return super.formatMessage(
      logLevel,
      message,
      pidMessage,
      formattedLogLevel,
      contextMessage,
      timestampDiff
    );
  }

  log(message: string, ...rest: any[]) {
    super.log(chalk.hex('#00ff9c')(message), ...rest);
  }

  error(message: any, ...rest: any[]) {
    super.error(chalk.hex('#ff005c')(`${message}`, ...rest));
  }

  debug(message: any, ...rest: any[]) {
    super.debug(chalk.hex('#9b59b6')(message), ...rest);
  }

  warn(message: string, ...rest: any[]) {
    super.warn(chalk.hex('#ffffff')(message), ...rest);
  }
}

export class LoggingInterceptor implements NestInterceptor {
	private readonly logger = new ColoredLogger(LoggingInterceptor.name);

	intercept(
		context: ExecutionContext,
		next: CallHandler<object>,
	): Observable<object> | Promise<Observable<object>> {
		const request = context.switchToHttp().getRequest<Request>();
		const response = context.switchToHttp().getResponse<Response>();
		return next.handle().pipe(
			map((data) => {
				this.logger.log(
					JSON.stringify({
						userAgent: request.header('user-agent'),
						request: {
							method: request.method,
							url: request.url,
							body: request.body,
						},
						response: {
							...data,
							statusCode: response.statusCode,
						},
					}),
				);
				return data;
			}),
		);
	}
}
