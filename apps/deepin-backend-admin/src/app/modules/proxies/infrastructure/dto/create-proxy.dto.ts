import {
	IsArray,
	IsBoolean,
	IsEmail,
	IsJSON,
	IsNumber,
	IsObject,
	IsOptional,
	IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetAbonentsDtoQuery {
	@IsOptional()
	@IsObject()
	@Transform(({ value }) => (typeof value === 'string' ? JSON.parse(value) : value))
	filter?: { abonentId?: string };

	@IsOptional()
	@IsArray()
	@Transform(({ value }) => (typeof value === 'string' ? JSON.parse(value) : value))
	range?: [number, number];

	@IsOptional()
	@IsArray()
	@Transform(({ value }) => (typeof value === 'string' ? JSON.parse(value) : value))
	sort?: [string, 'ASC' | 'DESC'];
}

export class CreateProxyDto {
	@IsOptional()
	@IsString()
	ip: string;

	@IsOptional()
	@IsString()
	username: string;

	@IsString()
	@IsOptional()
	password: string;

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
