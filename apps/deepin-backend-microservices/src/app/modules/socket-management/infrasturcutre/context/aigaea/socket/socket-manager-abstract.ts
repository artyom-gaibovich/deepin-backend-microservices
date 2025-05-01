import { FailsafeSocket } from './failsafe.socket';
import { OfflineSocketState } from './states/offline-socket.state';
import {
  BadRequestException,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { AIGAEARequestFactory } from '../factory/aigaea-request.factory';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ProjectCreedsRepository } from '@deepin-backend-microservices/deepin-backend-admin/modules/project-creeds/application/project-creeds.repository';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { IProxyAbonentCreeds } from '@deepin-backend-microservices/deepin-backend-admin/modules/proxies-abonent-orchestration/domain/entities/proxy-abonent-link.entity';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ProxyAbonentRepository } from '@deepin-backend-microservices/deepin-backend-admin/modules/proxies-abonent-orchestration/application/proxy-abonent.repository';
import { ExtendedMessage, RMQService } from 'nestjs-rmq';

@Injectable()
export class SocketManagerAbstract implements OnModuleInit {
  public activeRequests: Map<string, { cancel: () => void }> = new Map();
  public sockets: Map<string, FailsafeSocket> = new Map();
  public messagesRmq: Map<string, ExtendedMessage> = new Map();

  constructor(
    @Inject() public projectCreedsRepository: ProjectCreedsRepository,
    @Inject() private AIGAEARequestFactory: AIGAEARequestFactory,
    @Inject() private ProxyAbonentRepository: ProxyAbonentRepository,
    @Inject()
    private readonly rmqService: RMQService
  ) {}

  onModuleInit() {
    setInterval(() => {
      console.log(`Воркеры: PID: ${this.sockets}, Size: ${this.sockets.size}`);
    }, 2000);
  }

  public handleStart(id: string, config: IProxyAbonentCreeds) {
    return this.ProxyAbonentRepository.updateById(id, {
      status: true,
    }).then(() => {
      const failsafeSocket = new FailsafeSocket(
        this.ProxyAbonentRepository,
        this.AIGAEARequestFactory,
        this.projectCreedsRepository,
        new OfflineSocketState(),
        this,
        id,
        config
      );
      this.sockets.set(id, failsafeSocket);
      failsafeSocket.startSocket();
    });
  }

  public startRmq(
    id: string,
    config: IProxyAbonentCreeds,
    message: ExtendedMessage
  ) {
    return this.ProxyAbonentRepository.updateById(id, {
      status: true,
    }).then(() => {
      const msg = this.messagesRmq.get(id);
      if (msg) {
        this.rmqService.nack(message);
        this.rmqService.nack(message);
        return;
      }
      if (this.messagesRmq.size === 2) {
        console.log('Передаю в другой воркер');
        this.rmqService.nack(message);
        return;
      }
      this.messagesRmq.set(id, message);
    });
  }

  public stopRmq(id: string) {
    return this.ProxyAbonentRepository.updateById(id, {
      status: false,
    }).then(() => {
      const message = this.messagesRmq.get(id);
      if (message) {
        return;
      }
      this.rmqService.ack(message);
    });
  }

  public handleStop(id: string) {
    return this.ProxyAbonentRepository.findById(id)
      .then((entity: any) => {
        if (entity.status === false) {
          console.log('пошел нахуй');
          return Promise.reject('NO_STATUS');
        }
        return this.ProxyAbonentRepository.updateById(id, {
          status: false,
        });
      })
      .then(() => {
        const failsafeSocket = this.sockets.get(id);
        if (!failsafeSocket) {
          throw new BadRequestException(`Не найден : ${id}`);
        }
        failsafeSocket.stopSocket();
        this.sockets.delete(id);
      });
  }
}
