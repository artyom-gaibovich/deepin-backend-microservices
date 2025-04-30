import { IsUUID } from 'class-validator';

export class RemoveAssigmentProxyToAbonentDto {
	@IsUUID()
	abonentId: string;

	@IsUUID()
	projectCreedsId: string;

	@IsUUID()
	proxyId: string;
}
