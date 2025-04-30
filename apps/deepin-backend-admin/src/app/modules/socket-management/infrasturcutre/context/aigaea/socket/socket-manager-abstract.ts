import { IProxyAbonentCreeds } from '../../../../../proxies-abonent-orchestration/domain/entities/proxy-abonent-link.entity';
import { FailsafeSocket } from './failsafe.socket';
import { OfflineSocketState } from './states/offline-socket.state';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ProjectCreedsRepository } from '../../../../../project-creeds/application/project-creeds.repository';
import { AIGAEARequestFactory } from '../factory/aigaea-request.factory';
import { ProxyAbonentRepository } from '../../../../../proxies-abonent-orchestration/application/proxy-abonent.repository';

@Injectable()
export class SocketManagerAbstract {
  public activeRequests: Map<string, { cancel: () => void }> = new Map();
  public sockets: Map<string, FailsafeSocket> = new Map();

  constructor(
    @Inject() public projectCreedsRepository: ProjectCreedsRepository,
    @Inject() private AIGAEARequestFactory: AIGAEARequestFactory,
    @Inject() private ProxyAbonentRepository: ProxyAbonentRepository
  ) {}

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

  public handleStop(id: string) {
    return this.ProxyAbonentRepository.updateById(id, {
      status: false,
    }).then(() => {
      const failsafeSocket = this.sockets.get(id);
      if (!failsafeSocket) {
        throw new BadRequestException(`Не найден : ${id}`);
      }
      failsafeSocket.stopSocket();
    });
  }
}
