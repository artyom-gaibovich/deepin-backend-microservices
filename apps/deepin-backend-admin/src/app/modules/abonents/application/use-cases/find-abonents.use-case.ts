import { AbonentRepository } from '../repositories/abonent.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAbonentsUseCase {
	constructor(private readonly repository: AbonentRepository) {}
	async execute() {
		return this.repository.findAll();
	}
}
