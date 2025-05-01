import { Body, Controller, Inject } from '@nestjs/common';
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
    console.log('HEL');
    return this.socketManagementUseCases
      .startSocket(dto)
      .then(() => {
        this.rmqService.ack(msg);
        return dto;
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
    //return this.socketManagementUseCases.stopRmq(dto);
    return this.socketManagementUseCases
      .stopSocket(dto)
      .then(() => {
        this.rmqService.ack(msg);
      })
      .catch(() => {
        return this.rmqService.nack(msg);
      });
  }

  @RMQValidate()
  @RMQRoute(TestSocket.topic, { manualAck: true })
  async testSocket(dto: TestSocket.Request, @RMQMessage msg: ExtendedMessage) {
    console.log('Process ID:', process.pid);
    return new Promise<any>((resolve, reject) => {
      resolve('OK');
    });
  }
}
