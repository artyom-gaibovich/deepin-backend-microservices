import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ColoredLogger, LoggingInterceptor } from '../libs/logging-interceptor';
import { HttpExceptionFilter } from '../libs/http-exception-filter';

function bootstrap() {
	const logger = new Logger('Main');
	NestFactory.create(AppModule, {
		logger: new ColoredLogger(),
	}).then((app) => {
		app.enableCors({
			origin: ['http://localhost:3000', 'http://localhost:5173'],
			methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
			allowedHeaders: 'Content-Type, Accept, Authorization',
			credentials: true,
		});
		app.useGlobalInterceptors(new LoggingInterceptor());
		app.useGlobalFilters(new HttpExceptionFilter());
		app.useGlobalPipes(
			new ValidationPipe({
				forbidNonWhitelisted: true,
			}),
		);

		app
			.listen(process.env.PORT ?? 3000, () => {
				logger.log('App is running port: ' + (process.env.PORT ?? 3000));
			})
			.then((data) => data)
			.catch((err) => console.error(err));
	});
}

bootstrap();
