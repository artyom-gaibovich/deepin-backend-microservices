import { Module, Provider } from '@nestjs/common';
import { ProxiesModule } from '../proxies/proxies.module';
import { AbonentsModule } from '../abonents/abonents.module';
import { ProxyAbonentOrchestrationController } from './interfaces/proxy-abonent-orchestration.controller';
import { ProxiesAbonentOrchestrationUseCases } from './application/proxies-abonent-orchestration.use-cases';
import { ProxyAbonentPrismaRepository } from './infrastructure/prisma/repositories/proxy-abonent-prisma.repository';
import { ProxyAbonentRepository } from './application/proxy-abonent.repository';

const application: Provider[] = [ProxiesAbonentOrchestrationUseCases];
const infrastructure: Provider[] = [
	{
		useClass: ProxyAbonentPrismaRepository,
		provide: ProxyAbonentRepository,
	},
];

@Module({
	imports: [ProxiesModule, AbonentsModule],
	providers: [...infrastructure, ...application],
	controllers: [ProxyAbonentOrchestrationController],
})
export class ProxiesAbonentOrchestrationModule {}
