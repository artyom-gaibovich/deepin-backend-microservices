import { ProxyEntity } from '../../domain/entities/proxy.entity';

export abstract class ProxyRepository {
	abstract findAll(params: Record<string, unknown>): Promise<ProxyEntity[]>;
	abstract findById(id: string): Promise<ProxyEntity | null>;
	abstract create(data: Partial<ProxyEntity>): Promise<ProxyEntity>;
	abstract update(id: string, data: Partial<ProxyEntity>): Promise<ProxyEntity>;
	abstract delete(id: string): Promise<void>;
	abstract deleteMany(ids: any[]): Promise<any>;
}
