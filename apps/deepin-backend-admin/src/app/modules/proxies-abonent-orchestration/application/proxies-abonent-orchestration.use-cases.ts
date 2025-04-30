import { Inject, Injectable } from '@nestjs/common';
import { ProxyAbonentRepository } from './proxy-abonent.repository';
import { AssignProxyToAbonentDto } from '../interfaces/dto/assign-proxy-to-abonent.dto';
import { ProxyAbonentLinkEntity } from '../domain/entities/proxy-abonent-link.entity';
import { ReassignProxyToAbonentDto } from '../interfaces/dto/reassign-proxy-to-abonent.dto';
import { RemoveAssigmentProxyToAbonentDto } from '../interfaces/dto/remove-assigment-proxy-to-abonent.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProxiesAbonentOrchestrationUseCases {
	constructor(@Inject() private proxyAbonentRepository: ProxyAbonentRepository) {}

	assignProxyToAbonent(AssignProxyToAbonentDto: AssignProxyToAbonentDto) {
		return this.proxyAbonentRepository.create(
			new ProxyAbonentLinkEntity({
				...AssignProxyToAbonentDto,
			}),
		);
	}

	getAssignedProxiesToAbonentMany(params: {
		filter?: { abonentId?: string };
		skip?: number;
		take?: number;
		orderBy?: Prisma.AbonentOrderByWithRelationInput;
	}) {
		return this.proxyAbonentRepository.findAll(params);
	}

	getAssignedProxiesToAbonentOne(id: string) {
		return this.proxyAbonentRepository.findById(id);
	}

	reassignProxyToAbonent(dto: ReassignProxyToAbonentDto) {
		return this.proxyAbonentRepository.update(
			new ProxyAbonentLinkEntity({
				...dto,
			}),
		);
	}

	removeAssigmentProxyToAbonent(dto: RemoveAssigmentProxyToAbonentDto) {
		return this.proxyAbonentRepository.delete(
			new ProxyAbonentLinkEntity({
				...dto,
			}),
		);
	}
}
