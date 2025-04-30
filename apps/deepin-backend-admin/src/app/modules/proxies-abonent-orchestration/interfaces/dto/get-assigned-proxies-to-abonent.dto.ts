import { IsUUID } from 'class-validator';

export class GetAssignedProxiesToAbonentDto {
	@IsUUID()
	abonentId: string;

	/**
	 * TODO Можно и фильтр захуярить сюдад,
	 * чтобы затем искать по проектам или по прочей хуйней
	 */

	/**
	 * TODO Кстати, проксям можно и страны тоже захуярить ?
	 *
	 * TODO Кстати, и важно было бы отслеживать качество соедениния проксей (хуй знает пока)
	 *
	 * */
}
