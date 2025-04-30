import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProxyDto {
	@IsOptional()
	@IsString()
	ip: string;

	@IsOptional()
	@IsString()
	username: string;

	@IsString()
	@IsOptional()
	password: string;

	@IsString()
	@IsOptional()
	host: string;

	@IsString()
	@IsOptional()
	protocol: string;

	@IsNumber()
	@IsOptional()
	port: number;

	@IsBoolean()
	@IsOptional()
	is_active: boolean;
}
