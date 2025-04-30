import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { ColoredLogger, LoggingInterceptor } from '../../../../../libs/logging-interceptor';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	private readonly logger = new ColoredLogger(LoggingInterceptor.name);

	constructor() {
		super({
			log: ['error', 'query', 'warn', 'info'],
			errorFormat: 'pretty',
		});
	}

	onModuleInit() {
		return this.$connect();
	}

	onModuleDestroy() {
		return this.$disconnect();
	}

	$on<
		V extends 'log' extends keyof Prisma.PrismaClientOptions
			? // @ts-ignore
				Prisma.PrismaClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
				? // @ts-ignore

					Prisma.GetEvents<Prisma.PrismaClientOptions['log']>
				: never
			: never,
	>(
		eventType: V,
		callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void,
	): PrismaClient {
		// @ts-ignore
		return super.$on('query', (e: any) => {
			this.logger.debug('Query: ' + e.query);
			this.logger.debug('Params: ' + e.params);
			this.logger.debug('Duration: ' + e.duration + 'ms');
		});
	}
}
