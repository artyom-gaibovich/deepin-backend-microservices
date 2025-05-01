import { Body, Controller, Inject } from '@nestjs/common';
import { SocketService } from '../../../../../../../deepin-backend-admin/src/app/modules/socket-management/service/socket.service';
import { RMQRoute, RMQService, RMQValidate } from 'nestjs-rmq';
import {
  StartSocket,
  StopSocket,
} from '@deepin-backend-microservices/contracts';
import { SocketManagementUseCases } from '@deepin-backend-microservices/deepin-backend-microservices/modules/socket-management/application/use-cases/socket-management.use-cases';

@Controller()
export class SocketManagementControllerAMQP {
  constructor(
    @Inject()
    private readonly socketManagementUseCases: SocketManagementUseCases
  ) {}

  @RMQValidate()
  @RMQRoute(StartSocket.topic)
  startSocket(@Body() dto: StartSocket.Request): Promise<void> {
    console.log('HEL');
    return this.socketManagementUseCases.startSocket(dto);
  }

  @RMQValidate()
  @RMQRoute(StopSocket.topic)
  stopSocket(@Body() dto: StopSocket.Request) {
    return this.socketManagementUseCases.stopSocket(dto);
  }
}
