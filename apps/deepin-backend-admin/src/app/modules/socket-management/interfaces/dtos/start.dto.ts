import { IsUUID } from 'class-validator';

export class StartSocketDto {
	@IsUUID()
	proxyToAbonentProjectId: string;
}
