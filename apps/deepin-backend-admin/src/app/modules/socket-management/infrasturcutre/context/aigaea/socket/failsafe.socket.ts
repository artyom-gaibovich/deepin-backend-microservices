import { AbstractSocketState } from './states/abstract-socket.state';
import { SocketManagerAbstract } from './socket-manager-abstract';
import { IProxyAbonentCreeds } from '../../../../../proxies-abonent-orchestration/domain/entities/proxy-abonent-link.entity';
import { ProjectCreedsRepository } from '../../../../../project-creeds/application/project-creeds.repository';
import { AIGAEARequestFactory } from '../factory/aigaea-request.factory';
import { ProxyAbonentRepository } from '../../../../../proxies-abonent-orchestration/application/proxy-abonent.repository';

export class FailsafeSocket {
	public socketState: AbstractSocketState;
	public socketManager: SocketManagerAbstract;
	public requestBody: any;
	public id: string;
	public config: IProxyAbonentCreeds;
	public projectCreedsRepository: ProjectCreedsRepository;
	public AIGAEARequestFactory: AIGAEARequestFactory;
	public ProxyAbonentRepository: ProxyAbonentRepository;
	public cachedUIDS: Map<string, number> = new Map();

	constructor(
		ProxyAbonentRepository: ProxyAbonentRepository,
		AIGAEARequestFactory: AIGAEARequestFactory,
		projectCreedsRepository: ProjectCreedsRepository,
		state: AbstractSocketState,
		socketManager: SocketManagerAbstract,
		id: string,
		config: IProxyAbonentCreeds,
	) {
		this.ProxyAbonentRepository = ProxyAbonentRepository;
		this.AIGAEARequestFactory = AIGAEARequestFactory;
		this.projectCreedsRepository = projectCreedsRepository;
		this.socketManager = socketManager;
		this.id = id;
		this.config = config;
		this.changeState(state);
	}

	changeState(state: AbstractSocketState) {
		this.socketState = state;
		this.socketState.setContext(this);
		this.socketState.activate();
	}

	public startSocket(): void {
		this.socketState.toOnline();
	}

	public stopSocket(): void {
		this.socketState.toOffline();
	}
}
