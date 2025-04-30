import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProxyRepository } from '../../../application/repositories/proxy.repository';
import { ProxyEntity } from '../../../domain/entities/proxy.entity';
import { PrismaService } from '../../../../shared/persistence/prisma/prisma.service';

@Injectable()
export class ProxyPrismaRepository extends ProxyRepository {
	constructor(@Inject() private prismaService: PrismaService) {
		super();
	}

	create = (data: Partial<ProxyEntity>): Promise<ProxyEntity> =>
		this.prismaService.proxy.create({
			data: {
				...data,
			},
		});

	delete = (id: string): Promise<any> =>
		this.prismaService.proxy.delete({
			where: {
				id,
			},
		});

	findAll = (params: Record<string, any>): Promise<ProxyEntity[]> => {
		const { filter, skip, take, orderBy } = params;

		return this.prismaService.proxy.findMany({
			//where: filter,
			skip,
			take,
			orderBy,
			include: {
				abonents: true,
			},
		});
	};

	findById = (id: string): Promise<ProxyEntity | null> =>
		this.prismaService.proxy.findUnique({
			where: {
				id,
			},
			include: {
				abonents: true,
			},
		});

	update = (id: string, data: Partial<ProxyEntity>): Promise<ProxyEntity> =>
		this.prismaService.proxy.update({
			where: {
				id,
			},
			data: {
				...data,
			},
		});

	deleteMany(ids: any[]): Promise<any> {
		return this.prismaService.$transaction((prisma) => {
			return Promise.all(
				ids.map((id) =>
					prisma.proxy.delete({
						where: {
							id: id,
						},
					}),
				),
			)
				.then((data) => data)
				.catch((e) => {
					throw new BadRequestException(e);
				});
		});
	}
}
