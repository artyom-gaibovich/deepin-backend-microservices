import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { AbonentsModule } from './modules/abonents/abonents.module';
import { ProxiesModule } from './modules/proxies/proxies.module';
import { SharedModule } from './modules/shared/shared.module';
import { PrometheusModule } from './modules/prometheus/prometheus.module';
import { PrometheusService } from './modules/prometheus/prometheus.service';
import { ProxiesAbonentOrchestrationModule } from './modules/proxies-abonent-orchestration/proxies-abonent-orchestration.module';
import { ProjectCreedsModule } from './modules/project-creeds/project-creeds.module';
import { SocketManagementModule } from './modules/socket-management/socket-management.module';
import { getRMQConfig } from './config/rmq/rmq-config';
import { RMQModule } from 'nestjs-rmq';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as redisStore from 'cache-manager-redis-store';
import { createKeyv, Keyv } from '@keyv/redis';
import { CacheableMemory } from 'cacheable';

//TODO Не забыть индексы навесить !

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async () => {
        return {
          stores: [
            new Keyv({
              store: new CacheableMemory({
                ttl: 5000,
                lruSize: 5000,
              }),
            }),
            createKeyv('redis://0.0.0.0:60476'),
          ],
        };
      },
    }),
    RMQModule.forRootAsync(getRMQConfig()),
    AuthModule,
    AbonentsModule,
    ProxiesModule,
    SharedModule.register({
      type: 'prisma',
      global: true,
    }),
    PrometheusModule,
    ProxiesAbonentOrchestrationModule,
    ProjectCreedsModule,
    SocketManagementModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrometheusService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
