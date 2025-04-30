import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Put,
	Query,
	UseGuards,
} from '@nestjs/common';
import { CreateAbonentUseCase } from '../../application/use-cases/create-abonent.use-case';
import { UpdateAbonentUseCase } from '../../application/use-cases/update-abonent.use-case';
import { DeleteAbonentUseCase } from '../../application/use-cases/delete-abonent.use-case';
import { UpdateAbonentDto } from '../dto/update-abonent.dto';
import { FindAbonentUseCase } from '../../application/use-cases/find-abonent.use-case';
import { FindAbonentsUseCase } from '../../application/use-cases/find-abonents.use-case';
import { AccessTokenGuard } from '../../../auth/guards/accessToken.guard';
import { CreateAbonentDto } from '../dto/create-abonent.dto';
import { DeleteManyAbonentUseCase } from '../../application/use-cases/delete-many-abonent.use-case';

@Controller('abonents')
export class AbonentController {
	constructor(
		private readonly createUseCase: CreateAbonentUseCase,
		private readonly findAbonentUseCase: FindAbonentUseCase,
		private readonly findAbonentsUseCase: FindAbonentsUseCase,
		private readonly updateUseCase: UpdateAbonentUseCase,
		private readonly deleteUseCase: DeleteAbonentUseCase,
		private readonly deleteManyUseCase: DeleteManyAbonentUseCase,
	) {}

	/*
	@UseGuards(AccessTokenGuard)
*/
	@Post('/')
	create(@Body() dto: CreateAbonentDto) {
		return this.createUseCase.execute({ email: dto.email, passwordHash: dto.password });
	}

	@Get('/')
	async findAll(@Query('filter') filter: string) {
		return this.findAbonentsUseCase.execute().then((d) => d);
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		return this.findAbonentUseCase.execute(id);
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() dto: UpdateAbonentDto) {
		return this.updateUseCase.execute(id, dto);
	}

	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.deleteUseCase.execute(id);
	}

	@Delete()
	deleteMany(@Query('filter') filter: string) {
		Promise.resolve(filter)
			.then(JSON.parse)
			.then(({ id }) => this.deleteManyUseCase.execute(id));
	}
}
