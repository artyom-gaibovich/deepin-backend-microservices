import { Prisma } from '@prisma/client';

export class ProjectCreedsEntity {
	public readonly id: string;
	public readonly title: string;
	public readonly credentials: Prisma.JsonValue;

	constructor({ id, title, credentials }: ProjectCreedsEntity) {
		this.id = id;
		this.title = title;
		this.credentials = credentials;
	}
}
