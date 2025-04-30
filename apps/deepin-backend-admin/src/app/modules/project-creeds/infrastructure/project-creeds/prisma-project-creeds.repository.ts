import { Injectable } from '@nestjs/common';
import { ProjectCreedsRepository } from '../../application/project-creeds.repository';
import { ProjectCreedsEntity } from '../../domain/entities/project-creeds.entity';
import { PrismaService } from '../../../shared/persistence/prisma/prisma.service';

@Injectable()
export class PrismaProjectCreedsRepository extends ProjectCreedsRepository {
	constructor(private readonly prismaService: PrismaService) {
		super();
	}

	create = (data: Partial<ProjectCreedsEntity>): Promise<ProjectCreedsEntity> =>
		this.prismaService.projectCreeds.create({
			data: {
				...data,
			},
		});

	delete = (id: string): Promise<any> =>
		this.prismaService.projectCreeds.delete({
			where: {
				id: id,
			},
		});

	find = (id: string): Promise<ProjectCreedsEntity> =>
		this.prismaService.projectCreeds.findUnique({
			where: {
				id: id,
			},
		});

	findAll = (): Promise<ProjectCreedsEntity[]> => this.prismaService.projectCreeds.findMany({});

	update = (id: string, data: Partial<ProjectCreedsEntity>): Promise<ProjectCreedsEntity> =>
		this.prismaService.projectCreeds.update({
			where: {
				id: id,
			},
			data: {
				...data,
			},
		});

	deleteMany(ids: any[]): Promise<any> {
		return this.prismaService.$transaction((prisma) => {
			return Promise.all(
				ids.map((id) =>
					prisma.projectCreeds.delete({
						where: {
							id: id,
						},
					}),
				),
			);
		});
	}
}
