import { AbstractSocketState } from './abstract-socket.state';
import { OnlineSocketState } from './online-socket.state';

export class OfflineSocketState extends AbstractSocketState {
	ping(): void {
		throw new Error('Not implemented');
	}

	toOffline(): void {
		throw new Error('Not implemented');
	}

	toOnline(): void {
		this.failsafeSocket.changeState(new OnlineSocketState());
	}

	activate(): void {
		this.logger.warn('Текущее состояние: ', OfflineSocketState.name);
	}
}
