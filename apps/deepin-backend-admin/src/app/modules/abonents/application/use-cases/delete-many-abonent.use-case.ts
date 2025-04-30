import { AbonentRepository } from '../repositories/abonent.repository';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteManyAbonentUseCase {
	constructor(private readonly repository: AbonentRepository) {}
	async execute(ids: string[]): Promise<any> {
		return this.repository.deleteMany(ids);
	}
}
