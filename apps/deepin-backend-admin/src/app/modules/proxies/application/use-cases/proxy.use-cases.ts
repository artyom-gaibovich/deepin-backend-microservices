import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProxyEntity } from '../../domain/entities/proxy.entity';
import { ProxyRepository } from '../repositories/proxy.repository';
import { CreateProxyDto } from '../../infrastructure/dto/create-proxy.dto';
import { UpdateProxyDto } from '../../infrastructure/dto/update-proxy.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProxyUseCases {
	constructor(@Inject() private repository: ProxyRepository) {}

	findProxy = (id: string): Promise<ProxyEntity> =>
		this.repository.findById(id).then((proxyEntity: ProxyEntity) => {
			if (!proxyEntity) {
				throw new NotFoundException(`Not found proxy entity with id ${id}`);
			}
			return proxyEntity;
		});

	findProxies(params: {
		filter?: { abonentId?: string };
		skip?: number;
		take?: number;
		orderBy?: Prisma.AbonentOrderByWithRelationInput;
	}): Promise<ProxyEntity[]> {
		return this.repository.findAll(params);
	}

	createProxy(ProxyDTO: CreateProxyDto) {
		return this.repository.create(
			new ProxyEntity({
				...ProxyDTO,
			}),
		);
	}

	updateProxy(id: string, ProxyDTO: UpdateProxyDto) {
		return this.repository.update(
			id,
			new ProxyEntity({
				...ProxyDTO,
			}),
		);
	}

	deleteProxy(id: string): Promise<void> {
		return this.repository.delete(id);
	}

	deleteMany(ids: string[]): Promise<void> {
		return this.repository.deleteMany(ids);
	}
}
