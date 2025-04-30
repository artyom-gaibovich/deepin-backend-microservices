import { IsUUID } from 'class-validator';

export class ReassignProxyToAbonentDto {
	@IsUUID()
	abonentId: string;

	@IsUUID()
	proxyId: string;

	@IsUUID()
	projectCreedsId: string;
}
