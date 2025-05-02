import { AbstractSocketState } from './abstract-socket.state';
import axios from 'axios';
import {
  PingInterface,
  PingResponse,
} from '../../../../../interfaces/ping/ping-responses';
import { OfflineSocketState } from './offline-socket.state';
import { ProjectCreedsEntity } from '../../../../../../../../../../deepin-backend-admin/src/app/modules/project-creeds/domain/entities/project-creeds.entity';

export class OnlineSocketState extends AbstractSocketState {
  toOffline(): void {
    const { activeRequests } = this.failsafeSocket.socketManager;
    const { id } = this.failsafeSocket;
    const controller = activeRequests.get(id);
    if (controller) {
      controller.cancel();
      console.log(`Stopped requests for id ${id}`);
    }
    this.failsafeSocket.changeState(new OfflineSocketState());
  }

  toOnline(): void {
    throw new Error('Not implemented');
  }

  activate(): void {
    this.logger.warn('Текущее состояние: ', OnlineSocketState.name);
    const { id, config } = this.failsafeSocket;
    const { project, proxy } = config;
    const { credentials, title } = project;
    const { token, browser_id } = credentials as {
      token: string;
      browser_id: string;
    };

    const { protocol, ip, username, password, port, host } = proxy;

    const { activeRequests } = this.failsafeSocket.socketManager;
    if (activeRequests.has(id)) return;
    if (!token) {
      throw new Error('No Token provided');
    }
    let isCancelled = false;
    const authConfig = {
      uid: '',
    };

    activeRequests.set(id, {
      cancel: () => {
        isCancelled = true;
        activeRequests.delete(id);
      },
    });
    const pingRequest = () =>
      axios
        .post<PingResponse>(
          ...this.failsafeSocket.AIGAEARequestFactory.find(
            `POST v1/network/ping`
          )({
            token,
            browser_id: browser_id,
            authConfig,
            password,
            port,
            username,
            host,
          })
        )
        .then(({ data }) => {
          const { msg, code, success } = data;
          if (code === 410) {
            console.error(data);
          }
          const { score, interval } = data.data;
          this.logger.log(
            `
						Проект: [${title}]:
						Сообщение: ${msg ?? ''}
						Прокси: ${protocol}://${username}:${password}@${ip}:${port}
						Успех: [${success}]
						Код : ${code}
						Рейтинг: [${score}]
						Интервал: [${interval}]`,
            OnlineSocketState.name
          );
          return new Promise((resolve) => setTimeout(resolve, 3000));
        })
        .catch((error) => {
          console.error(`Request ${'x'} failed:`, error.message);
          return new Promise((resolve) => setTimeout(resolve, 3000));
        });

    const makePingRequestChain = () => {
      if (isCancelled) return;
      pingRequest().then(makePingRequestChain);
    };
    const makeAuthRequest = () =>
      axios.post<PingInterface>(
        ...this.failsafeSocket.AIGAEARequestFactory.find(`GET v1/session/auth`)(
          {
            token,
            password,
            port,
            username,
            host,
          }
        )
      );

    const authRequestChain = () => {
      if (isCancelled) return;
      makeAuthRequest()
        .then(({ data }) => {
          const { uid } = data.data;
          this.logger.log(JSON.stringify(data));
          authConfig.uid = uid;
          return this.failsafeSocket.projectCreedsRepository.update(
            project.id,
            new ProjectCreedsEntity({
              id: project.id,
              title: project.title,
              credentials: {
                ...credentials,
                ...authConfig,
              } as any,
            })
          );
        })
        .then(pingRequest)
        .catch((error) => {
          console.error(`Request ${'x'} failed:`, error.message);
          return new Promise((resolve) => setTimeout(resolve, 3000));
        })
        .then(makePingRequestChain);
    };

    if (!authConfig.uid) {
      authRequestChain();
    }
    if (authConfig.uid) {
      makePingRequestChain();
    }
  }
}
