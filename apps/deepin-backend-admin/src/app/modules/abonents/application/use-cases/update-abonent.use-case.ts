import { AbonentRepository } from '../repositories/abonent.repository';
import { Injectable } from '@nestjs/common';
import { UpdateAbonentDto } from '../../infrastructure/dto/update-abonent.dto';

@Injectable()
export class UpdateAbonentUseCase {
	constructor(private readonly repository: AbonentRepository) {}
	async execute(id: string, dto: UpdateAbonentDto) {
		return this.repository.update(id, dto);
	}
}
