import { ProjectCreedsEntity } from '../domain/entities/project-creeds.entity';

export abstract class ProjectCreedsRepository {
	abstract find(id: string): Promise<ProjectCreedsEntity>;

	abstract findAll(): Promise<ProjectCreedsEntity[]>;

	abstract create(data: Partial<ProjectCreedsEntity>): Promise<ProjectCreedsEntity>;

	abstract update(id: string, data: Partial<ProjectCreedsEntity>): Promise<ProjectCreedsEntity>;

	abstract delete(id: string): Promise<void>;

	abstract deleteMany(ids: string[]): Promise<any>;
}
