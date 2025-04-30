import { Module, Provider } from '@nestjs/common';
import { AbonentController } from './infrastructure/controllers/abonent.controller';
import { CreateAbonentUseCase } from './application/use-cases/create-abonent.use-case';
import { PrismaAbonentRepository } from './infrastructure/prisma/repositories/prisma-abonent.repository';
import { AbonentRepository } from './application/repositories/abonent.repository';
import { FindAbonentUseCase } from './application/use-cases/find-abonent.use-case';
import { FindAbonentsUseCase } from './application/use-cases/find-abonents.use-case';
import { DeleteAbonentUseCase } from './application/use-cases/delete-abonent.use-case';
import { UpdateAbonentUseCase } from './application/use-cases/update-abonent.use-case';
import { DeleteManyAbonentUseCase } from './application/use-cases/delete-many-abonent.use-case';

const application: Provider[] = [
  CreateAbonentUseCase,
  FindAbonentUseCase,
  FindAbonentsUseCase,
  DeleteAbonentUseCase,
  UpdateAbonentUseCase,
  DeleteManyAbonentUseCase,
];
const infrastructure: Provider[] = [
	{
		useClass: PrismaAbonentRepository,
		provide: AbonentRepository,
	},
];
@Module({
	providers: [...infrastructure, ...application],
	controllers: [AbonentController],
})
export class AbonentsModule {}
