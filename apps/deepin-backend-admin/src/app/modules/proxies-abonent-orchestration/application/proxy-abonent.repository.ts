import { ProxyAbonentLinkEntity } from '../domain/entities/proxy-abonent-link.entity';

export abstract class ProxyAbonentRepository {
	abstract create(data: ProxyAbonentLinkEntity): Promise<ProxyAbonentLinkEntity | null>;
	abstract findById(id: string): Promise<ProxyAbonentLinkEntity | null>;
	abstract findAll(params?: any): Promise<ProxyAbonentLinkEntity[] | any>;
	abstract delete(data: ProxyAbonentLinkEntity): Promise<ProxyAbonentLinkEntity | null>;
	abstract update(data: ProxyAbonentLinkEntity): Promise<ProxyAbonentLinkEntity | null>;

	abstract updateById(id, data: { status: boolean }): Promise<ProxyAbonentLinkEntity | null>;
}
