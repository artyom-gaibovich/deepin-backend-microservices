import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProxyUseCases } from '../../application/use-cases/proxy.use-cases';
import { UpdateProxyDto } from '../dto/update-proxy.dto';

import { ResponseDescription } from './response-description';
import { CreateProxyDto, GetAbonentsDtoQuery } from '../dto/create-proxy.dto';

@Controller('proxies')
export class ProxiesController {
  constructor(@Inject() private proxyUseCases: ProxyUseCases) {}

  /*
    @UseGuards(AccessTokenGuard)
*/
  @Put(':id')
  update(@Param('id') id: string, @Body() updatedDTO: UpdateProxyDto) {
    return this.proxyUseCases.updateProxy(id, updatedDTO);
  }

  /*@UseGuards(AccessTokenGuard)*/
  @Get(':id')
  find(@Param('id') id: string) {
    return this.proxyUseCases.findProxy(id);
  }

  /*@UseGuards(AccessTokenGuard)*/

  //TODO Добавить filter=?(чтобы была поисковая выдача по определенным критериям)
  @Get()
  findAll(@Query() query: GetAbonentsDtoQuery) {
    const { filter, range, sort } = query;
    return this.proxyUseCases.findProxies({
      filter,
      skip: range?.[0] || 0,
      take: range ? range[1] - range[0] + 1 : 25,
      orderBy: sort ? { [sort[0]]: sort[1].toLowerCase() } : undefined,
    });
  }

  /*
    @UseGuards(AccessTokenGuard)
*/

  @Post('/')
  create(@Body() createProxyDto: CreateProxyDto) {
    return this.proxyUseCases.createProxy(createProxyDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.proxyUseCases.deleteProxy(id);
  }

  @Delete()
  deleteMany(@Query('filter') filter: string) {
    return Promise.resolve(filter)
      .then(JSON.parse)
      .then(({ id }) => this.proxyUseCases.deleteMany(id));
  }
}
