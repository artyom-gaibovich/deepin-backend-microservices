import { IsUUID } from 'class-validator';

export class AssignProxyToAbonentDto {
	@IsUUID()
	abonentId: string;

	@IsUUID()
	proxyId: string;

	@IsUUID()
	projectCreedsId: string;
}
