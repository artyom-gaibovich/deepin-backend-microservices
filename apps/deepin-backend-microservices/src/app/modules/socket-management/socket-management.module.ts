import { Module, Provider } from '@nestjs/common';
import { SocketService } from './service/socket.service';
import { SocketManagementUseCases } from './application/use-cases/socket-management.use-cases';
import { AIGAEAStrategy } from './infrasturcutre/strategies/deepin-projects/aigaea/aigaea.strategy';
import { AIGAEARequestFactory } from './infrasturcutre/context/aigaea/factory/aigaea-request.factory';
import { SocketManagerAbstract } from './infrasturcutre/context/aigaea/socket/socket-manager-abstract';
import { ProxyAbonentPrismaRepository } from '../../../../../deepin-backend-admin/src/app/modules/proxies-abonent-orchestration/infrastructure/prisma/repositories/proxy-abonent-prisma.repository';
import { ProxyAbonentRepository } from '../../../../../deepin-backend-admin/src/app/modules/proxies-abonent-orchestration/application/proxy-abonent.repository';
import { PrismaProjectCreedsRepository } from '../../../../../deepin-backend-admin/src/app/modules/project-creeds/infrastructure/project-creeds/prisma-project-creeds.repository';
import { ProjectCreedsRepository } from '../../../../../deepin-backend-admin/src/app/modules/project-creeds/application/project-creeds.repository';
import { SocketManagementControllerAMQP } from '@deepin-backend-microservices/deepin-backend-microservices/modules/socket-management/interfaces/amqp/socket-management.amqp';

const application: Provider[] = [SocketManagementUseCases, SocketService];

const infrastructure: Provider[] = [
  SocketManagerAbstract,
  AIGAEAStrategy,
  AIGAEARequestFactory,
  {
    useClass: ProxyAbonentPrismaRepository,
    provide: ProxyAbonentRepository,
  },
  {
    useClass: PrismaProjectCreedsRepository,
    provide: ProjectCreedsRepository,
  },
  {
    provide: ProxyAbonentRepository,
    useClass: ProxyAbonentPrismaRepository,
  },
];
@Module({
  imports: [],
  providers: [...application, ...infrastructure],
  controllers: [SocketManagementControllerAMQP],
})
export class SocketManagementModule {}
