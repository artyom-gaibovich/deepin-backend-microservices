import { FailsafeSocket } from '../failsafe.socket';
import { ColoredLogger } from '../../../../../../../../libs/logging-interceptor';

export abstract class AbstractSocketState {
	protected readonly logger = new ColoredLogger(AbstractSocketState.name);
	protected failsafeSocket: FailsafeSocket;

	public setContext(context: FailsafeSocket) {
		this.failsafeSocket = context;
	}

	public abstract toOffline(): void;

	public abstract toOnline(): void;

	public abstract activate(): void;
}
