import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../shared/persistence/prisma/prisma.service';
import { ProxyAbonentRepository } from '../../../application/proxy-abonent.repository';
import { ProxyAbonentLinkEntity } from '../../../domain/entities/proxy-abonent-link.entity';

@Injectable()
export class ProxyAbonentPrismaRepository extends ProxyAbonentRepository {
	constructor(@Inject() private prismaService: PrismaService) {
		super();
	}

	public create = (data: ProxyAbonentLinkEntity): Promise<ProxyAbonentLinkEntity | null> =>
		this.prismaService.proxyToAbonent.create({
			data: {
				...data,
			},
		});

	public delete = (data: ProxyAbonentLinkEntity): Promise<ProxyAbonentLinkEntity | null> =>
		this.prismaService.proxyToAbonent.delete({
			where: {
				proxyId_abonentId_projectCreedsId: data,
			},
		});

	public update = (data: ProxyAbonentLinkEntity): Promise<ProxyAbonentLinkEntity | null> =>
		this.prismaService.proxyToAbonent.update({
			data: {
				...data,
			},
			where: {
				proxyId_abonentId_projectCreedsId: data,
			},
		});

	findById(id: string): Promise<ProxyAbonentLinkEntity | null> {
		return this.prismaService.proxyToAbonent
			.findUnique({
				where: {
					id: id,
				},
				include: {
					proxy: true,
					project: true,
					abonent: true,
				},
			})
			.then((record) => {
				if (!record) {
					throw new NotFoundException();
				}
				return record;
			});
	}

	findAll(params: any): Promise<ProxyAbonentLinkEntity[] | null> {
		const { filter, skip, take, orderBy } = params;
		return this.prismaService.proxyToAbonent.findMany({
			where: filter,
			skip,
			take,
			orderBy,
			include: {
				proxy: true,
				project: true,
				abonent: true,
			},
		});
	}

	updateById(id, data: { status: boolean }): Promise<ProxyAbonentLinkEntity | null> {
		return this.prismaService.proxyToAbonent.update({
			data: {
				...data,
			},
			where: {
				id: id,
			},
		});
	}
}
