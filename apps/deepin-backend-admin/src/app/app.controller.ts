import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { request } from 'express';
import { ConcreteSocket } from './test/ConceteSocket';
import { Socket } from './test/Socket';

@Controller()
export class AppController {
  private requests: Map<string, Socket> = new Map();

  constructor(private readonly appService: AppService) {}

  @Get('start')
  async testPing() {
    const socket = new ConcreteSocket('http://localhost:4000', 2000);
    socket.start();
    this.requests.set('id_01', socket);
  }

  @Get('stop')
  async stopPing() {
    const socket = this.requests.get('id_01');
    if (!socket) {
      return '404';
    }
    socket.stop();
  }
}
