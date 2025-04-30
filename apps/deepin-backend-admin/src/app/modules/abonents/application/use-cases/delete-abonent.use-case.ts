import { AbonentRepository } from '../repositories/abonent.repository';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteAbonentUseCase {
	constructor(private readonly repository: AbonentRepository) {}
	async execute(id: string): Promise<any> {
		return this.repository.delete(id);
	}
}
