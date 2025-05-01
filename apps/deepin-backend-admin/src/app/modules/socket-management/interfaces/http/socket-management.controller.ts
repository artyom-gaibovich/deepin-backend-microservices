import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { StartSocketDto } from '../dtos/start.dto';
import { StopSocketDto } from '../dtos/stop.dto';
import { ExtendedMessage, RMQService } from 'nestjs-rmq';
import {
  StartSocket,
  TestSocket,
} from '@deepin-backend-microservices/contracts';
import { StopSocket } from '@deepin-backend-microservices/contracts';

@Controller('socket-management')
export class SocketManagementController {
  public messagesRmq: Map<string, ExtendedMessage> = new Map();

  constructor(
    @Inject()
    private readonly rmqService: RMQService
  ) {}

  @Post('/start')
  startSocket(@Body() dto: StartSocketDto) {
    return this.rmqService.send<StartSocket.Request, StartSocket.Response>(
      StartSocket.topic,
      dto
    );
  }

  @Post('/stop')
  stopSocket(@Body() dto: StopSocketDto) {
    return this.rmqService
      .send<StopSocket.Request, StopSocket.Response>(StopSocket.topic, dto)
      .then((data) => data)
      .catch();
  }

  @Get('/test')
  testSocket(@Body() dto: TestSocket.Request) {
    return this.rmqService
      .send<TestSocket.Request, TestSocket.Response>(TestSocket.topic, dto)
      .then((data) => data)
      .catch((err) => err);
  }
}
