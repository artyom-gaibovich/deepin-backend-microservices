import { ProjectCreedsRepository } from './project-creeds.repository';
import { ProjectCreedsEntity } from '../domain/entities/project-creeds.entity';
import { UpdateProjectCreedsDto } from '../interfaces/dto/update-project-creeds.dto';
import { CreateProjectCreedsDto } from '../interfaces/dto/create-project-creeds.dto';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProjectCreedsUseCases {
	constructor(@Inject() private readonly projectCreedsRepository: ProjectCreedsRepository) {}

	findProxy(id: string): Promise<ProjectCreedsEntity> {
		return this.projectCreedsRepository.find(id);
	}

	findAll(): Promise<ProjectCreedsEntity[]> {
		return this.projectCreedsRepository.findAll();
	}

	create(dto: CreateProjectCreedsDto): Promise<ProjectCreedsEntity> {
		return this.projectCreedsRepository.create(dto);
	}

	update(id: string, dto: UpdateProjectCreedsDto): Promise<ProjectCreedsEntity> {
		return this.projectCreedsRepository.update(id, dto);
	}

	delete(id: string): Promise<void> {
		return this.projectCreedsRepository.delete(id);
	}

	deleteMany(ids: string[]): Promise<void> {
		return this.projectCreedsRepository.deleteMany(ids);
	}
}
