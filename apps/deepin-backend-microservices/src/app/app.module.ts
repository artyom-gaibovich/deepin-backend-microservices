import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { getRMQConfig } from './config/rmq/rmq-config';
import { RMQModule } from 'nestjs-rmq';
import { SocketManagementModule } from './modules/socket-management/socket-management.module';
import { SharedModule } from '@deepin-backend-microservices/deepin-backend-admin/modules/shared/shared.module';

@Module({
  imports: [
    SharedModule.register({
      type: 'prisma',
      global: true,
    }),
    RMQModule.forRootAsync(getRMQConfig()),
    SocketManagementModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
