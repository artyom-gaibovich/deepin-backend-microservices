import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { StartSocketDto } from '../../interfaces/dtos/start.dto';
import { StopSocketDto } from '../../interfaces/dtos/stop.dto';
import { AIGAEAStrategy } from '../../infrasturcutre/strategies/deepin-projects/aigaea/aigaea.strategy';
import { SocketManagerAbstract } from '../../infrasturcutre/context/aigaea/socket/socket-manager-abstract';
import { ProxyAbonentRepository } from '../../../../../../../deepin-backend-admin/src/app/modules/proxies-abonent-orchestration/application/proxy-abonent.repository';
import { IProxyAbonentCreeds } from '../../../../../../../deepin-backend-admin/src/app/modules/proxies-abonent-orchestration/domain/entities/proxy-abonent-link.entity';
import { ExtendedMessage } from 'nestjs-rmq';

@Injectable()
export class SocketManagementUseCases {
  constructor(
    @Inject() private readonly proxyAbonentRepository: ProxyAbonentRepository,
    @Inject() private readonly socketManagerAbstract: SocketManagerAbstract,
    @Inject() private readonly AIGAEAStrategy: AIGAEAStrategy
  ) {}

  /**
   * Запуск неавторизованного сокета
   * Должна быть логика, которая создает browser_id (aigaea для прокси), и потом этот браузер айди нам надо использовать
   * @param dto
   */

  startSocket(dto: StartSocketDto) {
    return this.proxyAbonentRepository
      .findById(dto.proxyToAbonentProjectId)
      .then((data: IProxyAbonentCreeds) => {
        const { project, proxy } = data;
        const { is_active, id } = proxy;
        if (!is_active) {
          throw new BadRequestException(`Proxy ${id} is not active`);
        }
        return this.socketManagerAbstract.handleStart(
          dto.proxyToAbonentProjectId,
          data
        );
      });
  }

  stopSocket(dto: StopSocketDto) {
    return this.socketManagerAbstract.handleStop(dto.proxyToAbonentProjectId);
  }
}
