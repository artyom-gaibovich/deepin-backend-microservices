import { IsUUID } from 'class-validator';

export class StopSocketDto {
	@IsUUID()
	proxyToAbonentProjectId: string;
}
