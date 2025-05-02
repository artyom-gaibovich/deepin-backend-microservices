import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Controller()
export class AppController {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly appService: AppService
  ) {}

  @Get()
  getData() {
    return this.cacheManager
      .set('cached_item', { key: 32 })
      .then(() => {
        return this.cacheManager.get('cached_item');
      })
      .then((data) => data);
  }
}
