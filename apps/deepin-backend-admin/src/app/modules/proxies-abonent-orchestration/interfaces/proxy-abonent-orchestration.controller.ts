import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ProxiesAbonentOrchestrationUseCases } from '../application/proxies-abonent-orchestration.use-cases';
import { AssignProxyToAbonentDto } from './dto/assign-proxy-to-abonent.dto';
import { ReassignProxyToAbonentDto } from './dto/reassign-proxy-to-abonent.dto';
import { RemoveAssigmentProxyToAbonentDto } from './dto/remove-assigment-proxy-to-abonent.dto';
import { GetManyProxiesAbonentsCreedsDto } from './dto/get-many-proxies-abonents-creeds.dto';

@Controller('proxy-abonent-orchestration')
export class ProxyAbonentOrchestrationController {
	constructor(
		@Inject() private proxiesAbonentOrchestrationUseCases: ProxiesAbonentOrchestrationUseCases,
	) {}

	@Get('/')
	getAssignedProxiesToAbonentMany(@Query() query: GetManyProxiesAbonentsCreedsDto) {
		const { filter, range, sort } = query;

		return this.proxiesAbonentOrchestrationUseCases.getAssignedProxiesToAbonentMany({
			filter,
			skip: range?.[0] || 0,
			take: range ? range[1] - range[0] + 1 : 25,
			orderBy: sort ? { [sort[0]]: sort[1].toLowerCase() } : undefined,
		});
	}

	@Get(':id')
	getAssignedProxiesToAbonentOne(@Param('id') id: string) {
		return this.proxiesAbonentOrchestrationUseCases.getAssignedProxiesToAbonentOne(id);
	}

	@Post('/')
	assignProxyToAbonentDto(@Body() dto: AssignProxyToAbonentDto) {
		return this.proxiesAbonentOrchestrationUseCases.assignProxyToAbonent(dto);
	}

	@Patch('/')
	reassignProxyToAbonentDto(@Body() dto: ReassignProxyToAbonentDto) {
		return this.proxiesAbonentOrchestrationUseCases.reassignProxyToAbonent(dto);
	}

	@Delete('/')
	removeAssigmentProxyToAbonentDto(@Body() dto: RemoveAssigmentProxyToAbonentDto) {
		return this.proxiesAbonentOrchestrationUseCases.removeAssigmentProxyToAbonent(dto);
	}
}
