import { Body, Controller, Inject, NotFoundException } from '@nestjs/common';
import { SocketService } from '../../../../../../../deepin-backend-admin/src/app/modules/socket-management/service/socket.service';
import {
  ExtendedMessage,
  RMQMessage,
  RMQRoute,
  RMQService,
  RMQValidate,
} from 'nestjs-rmq';
import {
  StartSocket,
  StopSocket,
} from '@deepin-backend-microservices/contracts';
import { SocketManagementUseCases } from '@deepin-backend-microservices/deepin-backend-microservices/modules/socket-management/application/use-cases/socket-management.use-cases';
import { TestSocket } from '@deepin-backend-microservices/contracts';

@Controller()
export class SocketManagementControllerAMQP {
  constructor(
    @Inject()
    private readonly socketManagementUseCases: SocketManagementUseCases,
    @Inject()
    private readonly rmqService: RMQService
  ) {}

  @RMQValidate()
  @RMQRoute(StartSocket.topic, { manualAck: true })
  startSocket(
    @Body() dto: StartSocket.Request,
    @RMQMessage msg: ExtendedMessage
  ): Promise<any> {
    return this.socketManagementUseCases
      .startSocket(dto)
      .then(() => {
        this.rmqService.ack(msg);
        return {
          proxyToAbonentProjectId: dto.proxyToAbonentProjectId,
        };
      })
      .catch((err) => {
        this.rmqService.nack(msg);
      });
  }

  @RMQValidate()
  @RMQRoute(StopSocket.topic, { manualAck: true })
  stopSocket(
    @Body() dto: StopSocket.Request,
    @RMQMessage msg: ExtendedMessage
  ) {
    return this.socketManagementUseCases
      .stopSocket(dto)
      .then(() => {
        this.rmqService.ack(msg);
        console.log('dto.proxyToAbonentProjectId', dto.proxyToAbonentProjectId);
        return {
          proxyToAbonentProjectId: dto.proxyToAbonentProjectId,
        };
      })
      .catch((err) => {
        if (err === 'NO_STATUS') {
          this.rmqService.ack(msg);
          return {
            status: err,
          };
        }
        console.log(err.message);
        return this.rmqService.nack(msg);
      });
  }

  @RMQValidate()
  @RMQRoute(TestSocket.topic, { manualAck: true })
  async testSocket(dto: TestSocket.Request, @RMQMessage msg: ExtendedMessage) {
    console.log('Process ID:', process.pid);
    this.rmqService.ack(msg);
    return new Promise<any>((resolve, reject) => {
      resolve('OK');
    });
  }
}
