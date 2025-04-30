import { AbonentRepository } from '../repositories/abonent.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAbonentUseCase {
	constructor(private readonly repository: AbonentRepository) {}
	async execute(id: string) {
		return this.repository.findById(id);
	}
}
