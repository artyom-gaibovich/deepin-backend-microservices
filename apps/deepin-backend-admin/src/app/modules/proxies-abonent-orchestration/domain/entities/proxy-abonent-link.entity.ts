export interface IProxyAbonentCreeds {
	id: string;
	proxyId: string;
	abonentId: string;
	projectCreedsId: string;
	status: boolean;
	createdAt: string;
	updatedAt: any;
	proxy: IProxy;
	project: IProject;
	abonent: IAbonent;
}

export interface IProxy {
	id: string;
	ip: string;
	port: number;
	protocol: string;
	host: string;
	is_active: boolean;
	username: string;
	password: string;
	createdAt: string;
	updatedAt: string;
}

export interface IProject {
	id: string;
	title: string;
	credentials: Record<string, unknown>;
}

export interface IAbonent {
	id: string;
	email: string;
	passwordHash: string;
	refreshToken: any;
	createdAt: string;
	updatedAt: string;
}

export class ProxyAbonentLinkEntity {
	public readonly abonentId: string;
	public readonly proxyId: string;
	public readonly projectCreedsId: string;

	constructor({
		abonentId,
		proxyId,
		projectCreedsId,
	}: {
		abonentId: string;
		proxyId: string;
		projectCreedsId: string;
	}) {
		this.abonentId = abonentId;
		this.proxyId = proxyId;
		this.projectCreedsId = projectCreedsId;
	}
}
