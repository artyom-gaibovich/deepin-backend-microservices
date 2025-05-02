import { Controller, Get, Inject, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Cache,
  CACHE_MANAGER,
  CacheInterceptor,
  CacheKey,
  CacheTTL,
} from '@nestjs/cache-manager';

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly appService: AppService
  ) {}

  @Get()
  @CacheKey('some_route')
  @CacheTTL(5000)
  async getData() {
    await this.cacheManager.set('cached_item', { key: 32 }, 5000);
    const data = await this.cacheManager.get('cached_item');
    console.log(data);
    return 'ok';
  }
}
