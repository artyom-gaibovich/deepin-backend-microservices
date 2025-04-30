import { Module, Provider } from '@nestjs/common';
import { ProxiesController } from './infrastructure/controllers/proxies.controller';
import { ProxyRepository } from './application/repositories/proxy.repository';
import { ProxyPrismaRepository } from './infrastructure/prisma/repositories/proxy-prisma.repository';
import { ProxyUseCases } from './application/use-cases/proxy.use-cases';

const application: Provider[] = [ProxyUseCases];
const infrastructure: Provider[] = [
	{
		useClass: ProxyPrismaRepository,
		provide: ProxyRepository,
	},
];

@Module({
	providers: [...infrastructure, ...application],
	controllers: [ProxiesController],
})
export class ProxiesModule {}
