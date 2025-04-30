import { Module, Provider } from '@nestjs/common';
import { ProjectCreedsController } from './interfaces/project-creeds.controller';
import { PrismaProjectCreedsRepository } from './infrastructure/project-creeds/prisma-project-creeds.repository';
import { ProjectCreedsRepository } from './application/project-creeds.repository';
import { ProjectCreedsUseCases } from './application/project-creeds.use-cases';

const application: Provider[] = [ProjectCreedsUseCases];
const infrastructure: Provider[] = [
	{
		useClass: PrismaProjectCreedsRepository,
		provide: ProjectCreedsRepository,
	},
];

@Module({
	imports: [],
	providers: [...application, ...infrastructure],
	controllers: [ProjectCreedsController],
})
export class ProjectCreedsModule {}
