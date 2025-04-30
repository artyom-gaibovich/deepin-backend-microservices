import { IsEmail, IsJSON, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateProjectCreedsDto {
	@IsString()
	title: string;

	@IsOptional()
	@IsObject()
	credentials: Record<string, any>;
}
