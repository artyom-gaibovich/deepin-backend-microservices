import { Body, Controller, Inject, Post } from '@nestjs/common';
import { StartSocketDto } from '../dtos/start.dto';
import { StopSocketDto } from '../dtos/stop.dto';
import { RMQService } from 'nestjs-rmq';
import { StartSocket } from '@deepin-backend-microservices/contracts';
import { StopSocket } from '@deepin-backend-microservices/contracts';

@Controller('socket-management')
export class SocketManagementController {
  constructor(
    @Inject()
    @Inject()
    private readonly rmqService: RMQService
  ) {}

  @Post('/start')
  startSocket(@Body() dto: StartSocketDto) {
    return this.rmqService.send<StartSocket.Request, StartSocket.Response>(
      StartSocket.topic,
      dto,
      { headers: { requestId: 'adad' } }
    );
  }

  @Post('/stop')
  stopSocket(@Body() dto: StopSocketDto) {
    return this.rmqService.send<StopSocket.Request, StopSocket.Response>(
      StopSocket.topic,
      dto,
      { headers: { requestId: 'adad' } }
    );
  }
}
