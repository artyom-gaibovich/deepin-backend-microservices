import { Injectable, NotFoundException } from '@nestjs/common';
import { AbonentRepository } from '../../../application/repositories/abonent.repository';
import { Abonent } from '../../../domain/entities/abonent';
import { PrismaService } from '../../../../shared/persistence/prisma/prisma.service';
import { request } from 'express';
import { UpdateAbonentDto } from '../../dto/update-abonent.dto';

@Injectable()
export class PrismaAbonentRepository extends AbonentRepository {
	constructor(private readonly prisma: PrismaService) {
		super();
	}

	async findAll(): Promise<Abonent[]> {
		const records = await this.prisma.abonent.findMany({
			include: {
				proxies: {
					take: 10,
				},
			},
		});
		return records;
	}

	async findById(id: string): Promise<Abonent | null> {
		const record = await this.prisma.abonent.findUnique({
			where: {
				id,
			},
			include: {
				proxies: true,
			},
		});
		if (!record) {
			throw new NotFoundException(id);
		}
		return record;
	}

	async findByEmail(email: string): Promise<Abonent | null> {
		const record = await this.prisma.abonent.findUnique({ where: { email } });
		return record ? this.toEntity(record) : null;
	}

	create(data: { email: string; passwordHash: string }): Promise<Abonent> {
		return this.prisma.abonent.create({ data }).then((record) => this.toEntity(record));
	}

	async update(id: string, data: UpdateAbonentDto): Promise<Abonent> {
		const record = await this.prisma.abonent.update({
			where: { id: id },
			data: {
				...data,
			},
		});
		return this.toEntity(record);
	}

	delete(id: string): Promise<any> {
		return this.prisma.abonent.delete({ where: { id } });
	}

	deleteMany(ids: any[]): Promise<any> {
		return this.prisma
			.$transaction((prisma) => {
				return Promise.all(
					ids.map((id) =>
						prisma.abonent.delete({
							where: {
								id: id,
							},
						}),
					),
				);
			})
			.then((data) => data)
			.catch((e) => e);
	}

	private toEntity(record: any): Abonent {
		return new Abonent(
			record.id,
			record.email,
			record.passwordHash,
			record.refreshToken,
			record.createdAt,
			record.updatedAt,
		);
	}
}
