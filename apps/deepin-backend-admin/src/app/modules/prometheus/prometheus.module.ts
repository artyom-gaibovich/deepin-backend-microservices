import { Module } from '@nestjs/common';
import { PrometheusService } from './prometheus.service';
import { PrometheusController } from './prometheus.controller';

@Module({
  providers: [PrometheusService],
  controllers: [PrometheusController]
})
export class PrometheusModule {}
