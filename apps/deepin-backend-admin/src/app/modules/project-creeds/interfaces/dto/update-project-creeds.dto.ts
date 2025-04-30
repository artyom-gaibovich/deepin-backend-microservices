import { IsEmail, IsJSON, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateProjectCreedsDto {
	@IsUUID()
	id: string;

	@IsString()
	title: string;

	@IsOptional()
	@IsObject()
	credentials: Record<string, any>;
}
