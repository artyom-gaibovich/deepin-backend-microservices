export class ProxyEntity {
	public readonly id: string;
	public readonly username?: string;
	public readonly password?: string;
	public readonly port?: number;
	public readonly host?: string;
	public readonly ip?: string;
	public readonly protocol?: string;
	public readonly is_active?: boolean;
	public readonly createdAt?: Date;
	public readonly updatedAt?: Date;

	constructor({ username, password, port, host, protocol, ip, is_active }) {
		this.username = username;
		this.password = password;
		this.ip = ip;
		this.port = port;
		this.host = host;
		this.protocol = protocol;
		this.is_active = is_active;
	}
}
