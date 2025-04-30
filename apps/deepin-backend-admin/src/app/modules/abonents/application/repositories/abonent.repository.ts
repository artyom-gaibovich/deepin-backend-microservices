import { Abonent } from '../../domain/entities/abonent';

export abstract class AbonentRepository {
	abstract findAll(): Promise<Abonent[]>;
	abstract findById(id: string): Promise<Abonent | null>;
	abstract findByEmail(id: string): Promise<Abonent | null>;
	abstract create(data: Partial<Abonent>): Promise<Abonent>;
	abstract update(id: string, data: Partial<Abonent>): Promise<Abonent>;
	abstract delete(id: string): Promise<any>;
	abstract deleteMany(ids: any[]): Promise<any>;
}
