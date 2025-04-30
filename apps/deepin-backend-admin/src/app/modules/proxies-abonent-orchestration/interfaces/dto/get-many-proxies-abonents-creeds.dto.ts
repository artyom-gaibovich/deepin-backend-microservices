import { IsArray, IsObject, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetManyProxiesAbonentsCreedsDto {
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
